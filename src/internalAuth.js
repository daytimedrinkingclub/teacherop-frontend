import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, googleProvider, githubProvider } from './firebase';
import { signupOrLogin } from './api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const InternalAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        user.getIdToken().then((token) => {
          localStorage.setItem('token', token);
          setUser(user);
        });
      } else {
        localStorage.removeItem('token');
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signup = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const token = await user.getIdToken();
      const response = await signupOrLogin({ token }, 'signup');
      localStorage.setItem('token', response.token);
      setUser(user);
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  };

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const token = await user.getIdToken();
      const response = await signupOrLogin({ token }, 'login');
      localStorage.setItem('token', response.token);
      setUser(user);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const oauthLogin = async (provider) => {
    try {
      let userCredential;
      if (provider === 'google') {
        userCredential = await signInWithPopup(auth, googleProvider);
      } else if (provider === 'github') {
        userCredential = await signInWithPopup(auth, githubProvider);
      } else {
        throw new Error('Invalid OAuth provider');
      }
      const user = userCredential.user;
      const token = await user.getIdToken();
      const response = await signupOrLogin({ token }, 'login');
      localStorage.setItem('token', response.token);
      setUser(user);
    } catch (error) {
      console.error('OAuth login error:', error);
      throw error;
    }
  };


  const logout = async () => {
    try {
      await auth.signOut();
      localStorage.removeItem('token');
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  const value = { user, loading, signup, login, oauthLogin, logout };


  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};