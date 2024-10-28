import React, { useEffect, useRef } from 'react';
import { useSubscription } from '../../hooks/useSubscription';
import { SubscriptionPlan } from '../../types';

interface PaypalButtonRefs {
  [key: string]: React.RefObject<HTMLDivElement>;
}

const PlanSelector = () => {
  const {
    handleSubscribe,
    currentPlan,
    availablePlans,
    isSubscribed
  } = useSubscription();

  const paypalButtonRefs = useRef<PaypalButtonRefs>({});

  useEffect(() => {
    availablePlans.forEach(plan => {
      if (plan.id !== 'free' && !paypalButtonRefs.current[plan.id]) {
        paypalButtonRefs.current[plan.id] = React.createRef<HTMLDivElement>();
      }
    });
  }, [availablePlans]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {availablePlans.map((plan: SubscriptionPlan) => (
            <div
              key={plan.id}
              className={`relative p-6 bg-white rounded-lg shadow-sm border ${
                currentPlan.id === plan.id ? 'border-blue-500' : 'border-gray-200'
              }`}
            >
              {currentPlan.id === plan.id && (
                <div className="absolute top-0 right-0 -mr-1 -mt-1 w-8 h-8">
                  <span className="absolute inset-0 inline-flex rounded-full bg-blue-500">
                    <span className="text-white text-xs flex items-center justify-center">
                      ✓
                    </span>
                  </span>
                </div>
              )}

              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-900">{plan.name}</h3>
                <div className="mt-4">
                  <span className="text-4xl font-extrabold text-gray-900">
                    ${plan.price}
                  </span>
                  {plan.duration > 0 && (
                    <span className="text-base font-medium text-gray-500">
                      /month
                    </span>
                  )}
                </div>

                <ul className="mt-6 space-y-4">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="text-sm text-gray-500">
                      {feature}
                    </li>
                  ))}
                </ul>

                {(!isSubscribed || currentPlan.id !== plan.id) && plan.id !== 'free' && (
                  <div className="mt-8 space-y-4">
                    <div
                      ref={paypalButtonRefs.current[plan.id]}
                      id={`paypal-button-container-${plan.id}`}
                      className="min-h-[40px]"
                    />
                    <button
                      onClick={() => {
                        const element = paypalButtonRefs.current[plan.id]?.current;
                        if (element) {
                          handleSubscribe(plan.id, element);
                        }
                      }}
                      className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
                      disabled={!paypalButtonRefs.current[plan.id]?.current}
                    >
                      {isSubscribed ? 'Change Plan' : 'Subscribe'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlanSelector;