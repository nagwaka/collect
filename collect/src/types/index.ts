export {};  // This makes the file a module

export interface Project {
    id: number;
    created_at: string;
    user_id: string;
    name: string;
    description: string | null;
    tasks?: Task[];
  }
  
  export interface Task {
    id: number;
    created_at: string;
    project_id: number;
    title: string;
    description: string | null;
    status: 'todo' | 'in_progress' | 'done';
    due_date: string | null;
  }
  
  export interface Profile {
    id: string;
    username?: string;
    full_name?: string;
    avatar_url?: string;
    website?: string;
    email?: string;
    updated_at: string;
  }
  
  export interface User {
    id: string;
    email: string;
  }

  export type SubscriptionStatus = 'active' | 'cancelled' | 'expired';

  export interface Subscription {
    id: number;
    user_id: string;
    paypal_subscription_id: string;
    plan_id: string;
    status: SubscriptionStatus;
    current_period_start: string;
    current_period_end: string;
    created_at: string;
    updated_at: string;
  }

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  limits: {
    maxProjects: number;
    maxTasksPerProject?: number;
  };
  duration: number; // duration in days
}

// Add PayPal types
declare global {
  interface Window {
    paypal: {
      Buttons: (config: {
        createOrder: (data: unknown, actions: {
          order: {
            create: (orderData: {
              purchase_units: Array<{
                amount: {
                  value: string;
                  currency_code: string;
                };
                description: string;
              }>;
            }) => Promise<string>;
          };
        }) => Promise<string>;
        onApprove: (data: unknown, actions: {
          order: {
            capture: () => Promise<{
              id: string;
              [key: string]: unknown;
            }>;
          };
        }) => Promise<void>;
      }) => {
        render: (element: HTMLElement | string) => Promise<void>;
      };
    };
  }
}
