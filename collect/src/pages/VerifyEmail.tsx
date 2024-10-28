import React from 'react';
import { Link } from 'react-router-dom';

const VerifyEmail: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-md text-center">
      <h1 className="text-2xl font-bold mb-4">Verify your email</h1>
      <p className="mb-6">
        Verification link sent to your email. Please check your inbox
        and click the link to verify your email address.
      </p>
      <p className="text-gray-600">
        Once verified, you can{' '}
        <Link to="/signin" className="text-blue-500">
          sign in
        </Link>{' '}
        to your account.
      </p>
    </div>
  );
};

export default VerifyEmail;