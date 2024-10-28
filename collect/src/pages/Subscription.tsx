import React from 'react';
import { useLocation } from 'react-router-dom';
import PlanSelector from '../components/subscription/PlanSelector';

const Subscription: React.FC = () => {
  const location = useLocation();
  const message = location.state?.message;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Choose your plan</h1>
      
      {message && (
        <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-medium text-blue-800">Plan upgrade required</h3>
          <p className="text-sm text-blue-700">{message}</p>
        </div>
      )}
      
      <PlanSelector />
    </div>
  );
};

export default Subscription;