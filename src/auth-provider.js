import React, { createContext, useContext, useEffect, useState } from 'react';
import { signupOrLogin } from './api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      // TODO: Fetch user data from the server using the token
      // and set the user state accordingly
      // For example:
      // fetchUserData(token)
      //   .then((userData) => setUser(userData))
      //   .catch((error) => {
      //     console.error('Failed to fetch user data:', error);
      //     localStorage.removeItem('token');
      //   })
      //   .finally(() => setLoading(false));
    } else {
      setUser(null);
      setLoading(false);
    }
  }, []);

  const login = async (data) => {
    try {
      const response = await signupOrLogin(data);
      localStorage.setItem('token', response.token);
      setUser(response.user);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const value = { user, loading, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};