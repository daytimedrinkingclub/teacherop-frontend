import React, { useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import {auth, app, analytics } from './firebase';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard/Dashboard';
import AccountLayout from './components/Dashboard/Account/AccountLayout';
import Content from './components/Dashboard/Content/Content';
import Pricing from './components/Pricing/Pricing';
import Assessment from './components/Assessment/Assessment';
import Navbar from './components/Navbar/Navbar';
import LoginPage from './components/LoginPage';
import SupportPage from './components/PolicyPages/SupportPage';
import StaticPage from './components/PolicyPages/StaticPage';
import { useAuth } from './internal-auth';
import './App.css';



const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  return user ? children : <Navigate to="/login" />;
};

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />} />
      <Route path="/navbar" element={<Navbar />} />
      <Route path="/assessment" element={<Assessment />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/support" element={<SupportPage />} />
      <Route path="/terms-of-service" element={<StaticPage title="Terms of Service" contentFile="terms-of-service.txt" />} />
      <Route path="/privacy-policy" element={<StaticPage title="Privacy Policy" contentFile="privacy-policy.txt" />} />
      <Route path="/refund-policy" element={<StaticPage title="Refund Policy" contentFile="refund-policy.txt" />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/account"
        element={
          <ProtectedRoute>
            <AccountLayout />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/content/:courseId"
        element={
          <ProtectedRoute>
            <Content />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
