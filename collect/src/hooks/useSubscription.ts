import { useState, useEffect } from 'react';
import { supabase } from '../services/supabase';
import { useAuth } from './useAuth';
import { subscriptionPlans } from '../config/subscriptionPlans';
import { Subscription, SubscriptionPlan } from '../types';
import '../types';

export const useSubscription = () => {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const PAYPAL_CLIENT_ID = import.meta.env.VITE_PAYPAL_CLIENT_ID;

  useEffect(() => {
    if (user) {
      loadScript();
      fetchSubscription();
    }
  }, [user]);

  const loadScript = () => {
    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&currency=USD`;
    script.async = true;
    document.body.appendChild(script);
  };

  const fetchSubscription = async () => {
    try {
      const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user?.id)
        .eq('status', 'active')
        .single();

      if (error) throw error;
      
      if (data && new Date(data.current_period_end) < new Date()) {
        await updateSubscriptionStatus(data.id, 'expired');
        setSubscription(null);
      } else {
        setSubscription(data);
      }
    } catch (error) {
      console.error('Error fetching subscription:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateSubscriptionStatus = async (subscriptionId: number, status: 'active' | 'cancelled' | 'expired') => {
    const { error } = await supabase
      .from('subscriptions')
      .update({ status })
      .eq('id', subscriptionId);

    if (error) throw error;
  };

  const getCurrentPlan = (): SubscriptionPlan => {
    if (!subscription) return subscriptionPlans[0];
    return subscriptionPlans.find(plan => plan.id === subscription.plan_id) || subscriptionPlans[0];
  };

  const checkProjectLimit = async () => {
    const { data: projectCount } = await supabase
      .from('projects')
      .select('id', { count: 'exact' })
      .eq('user_id', user?.id);

    const currentPlan = getCurrentPlan();
    const count = projectCount?.length || 0;

    return {
      canCreate: count < currentPlan.limits.maxProjects,
      currentCount: count,
      limit: currentPlan.limits.maxProjects
    };
  };

  const handleSubscribe = async (planId: string, element: HTMLElement) => {
    const plan = subscriptionPlans.find(p => p.id === planId);
    if (!plan || !window.paypal) return;

    try {
      const paypal = window.paypal;
      await paypal.Buttons({
        createOrder: (_data: unknown, actions) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: plan.price.toString(),
                currency_code: 'USD'
              },
              description: `${plan.name} Plan - ${plan.duration} days`
            }]
          });
        },
        onApprove: async (_data: unknown, actions) => {
          const order = await actions.order.capture();
          
          const { error } = await supabase
            .from('subscriptions')
            .insert({
              user_id: user?.id,
              paypal_subscription_id: order.id,
              plan_id: plan.id,
              status: 'active',
              current_period_start: new Date().toISOString(),
              current_period_end: new Date(Date.now() + plan.duration * 24 * 60 * 60 * 1000).toISOString()
            });

          if (error) throw error;
          await fetchSubscription();
        }
      }).render(element);
    } catch (error) {
      console.error('Error processing payment:', error);
    }
  };

  return {
    subscription,
    loading,
    checkProjectLimit,
    handleSubscribe,
    isSubscribed: !!subscription,
    currentPlan: getCurrentPlan(),
    availablePlans: subscriptionPlans
  };
};