import React from 'react';
import { Link } from 'react-router-dom';

const Landing: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Collect ...</h1>
      <div className="max-w-2xl">
        <p className="mb-4">
          Your ultimate task management solution. Organize projects,
          collaborate with team members, and stay on top of your deadlines.
        </p>
        <div className="space-x-4">
          <Link
            to="/signup"
            className="bg-blue-500 text-white px-6 py-2 rounded inline-block"
          >
            Get Started
          </Link>
          <Link
            to="/signin"
            className="border border-blue-500 text-blue-500 px-6 py-2 rounded inline-block"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;