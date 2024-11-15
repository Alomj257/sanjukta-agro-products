import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import ForgetPassword from './components/auth/ForgetPassword';
import VerifyOtp from './components/auth/VerifyOtp';
import UpdatePassword from './components/auth/UpdatePassword';
import Super from './components/Super';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';

const ProtectedRoute = ({ children }) => {
  const accessToken = localStorage.getItem('accessToken');
  
  if (!accessToken) {
    // If no accessToken is found, redirect to the login page
    return <Navigate to="/login" replace />;
  }

  // If accessToken exists, allow access to the route
  return children;
};

const App = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forget/password" element={<ForgetPassword />} />

      {/* Protected Routes */}
      <Route element={<Super />}>
      <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/otp/verify" 
          element={
            <ProtectedRoute>
              <VerifyOtp />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/password/update" 
          element={
            <ProtectedRoute>
              <UpdatePassword />
            </ProtectedRoute>
          } 
        />
      </Route>
    </Routes>
  );
};

export default App;
