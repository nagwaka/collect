import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabase';
import { User } from '@supabase/supabase-js';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };
    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);

        // Only navigate on initial sign in or sign out
        if (event === 'INITIAL_SESSION') {
          // Do nothing; let the router handle initial routing
        } else if (event === 'SIGNED_IN') {
          // Only navigate if we're on a public route
          const publicRoutes = ['/', '/signin', '/signup'];
          if (publicRoutes.includes(window.location.pathname)) {
            navigate('/home');
          }
        } else if (event === 'SIGNED_OUT') {
          navigate('/');
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [navigate]);

  const signUp = async (email: string, password: string) => {
    const response = await supabase.auth.signUp({ email, password });
    if (response.error) {
      throw response.error;
    }
    return response;
  };

  const signIn = async (email: string, password: string) => {
    const response = await supabase.auth.signInWithPassword({ email, password });
    if (response.error) {
      throw response.error;
    }
    return response;
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return { user, loading, signUp, signIn, signOut };
};