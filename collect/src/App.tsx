import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import Landing from './pages/Landing';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Home from './pages/Home';
import VerifyEmail from './pages/VerifyEmail';
import Header from './components/layout/Header';
import Profile from './pages/Profile';
import Subscription from './pages/Subscription';

// Show loading state while checking authentication
const App: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  const publicRoutes = (
    <>
      <Route path="/" element={!user ? <Landing /> : <Navigate to="/home" replace />} />
      <Route path="/signup" element={!user ? <SignUp /> : <Navigate to="/home" replace />} />
      <Route path="/signin" element={!user ? <SignIn /> : <Navigate to="/home" replace />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
    </>
  );

  const protectedRoutes = (
    <>
      <Route 
        path="/home/*" 
        element={user ? <Home /> : <Navigate to="/signin" state={{ from: '/home' }} replace />} 
      />
      <Route 
        path="/profile" 
        element={user ? <Profile /> : <Navigate to="/signin" state={{ from: '/profile' }} replace />} 
      />
      <Route 
        path="/subscription" 
        element={user ? <Subscription /> : <Navigate to="/signin" />} 
      />
    </>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Routes>
        {publicRoutes}
        {protectedRoutes}
        <Route
          path="*"
          element={user ? <Navigate to="/home" replace /> : <Navigate to="/" replace />}
        />
      </Routes>
    </div>
  );
};

export default App;