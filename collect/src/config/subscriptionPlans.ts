import { SubscriptionPlan } from '../types/index';
  
  export const subscriptionPlans: SubscriptionPlan[] = [
    {
      id: 'free',
      name: 'Free',
      price: 0,
      description: 'Basic plan for individuals',
      features: [
        'Up to 5 projects',
        'Basic task management',
        'Personal dashboard'
      ],
      limits: {
        maxProjects: 5,
        maxTasksPerProject: 20
      },
      duration: 0 // unlimited for free plan
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 9.99,
      description: 'Perfect for professionals',
      features: [
        'Unlimited projects',
        'Advanced task management',
        'Priority support'
      ],
      limits: {
        maxProjects: Infinity,
        maxTasksPerProject: Infinity
      },
      duration: 30 // 30 days
    },
    {
      id: 'team',
      name: 'Team',
      price: 29.99,
      description: 'Best for small teams',
      features: [
        'Everything in Pro',
        'Team collaboration',
        'Advanced analytics'
      ],
      limits: {
        maxProjects: Infinity,
        maxTasksPerProject: Infinity
      },
      duration: 30 // 30 days
    }
  ];