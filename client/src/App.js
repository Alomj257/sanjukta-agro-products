import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import ForgetPassword from './components/auth/ForgetPassword';
import VerifyOtp from './components/auth/VerifyOtp';
import UpdatePassword from './components/auth/UpdatePassword';
import Home from './pages/Home';
import Super from './components/Super';
import AdminDashboard from './pages/admin/AdminDashboard';
import UserDashboard from './pages/user/UserDashboard';
import AdminLayout from './layouts/AdminLayout';
import UserLayout from './layouts/UserLayout';
import Supplier from './pages/admin/supplier/Supplier';
import AddSupplier from './pages/admin/supplier/AddSupplier';
import ViewSupplier from './pages/admin/supplier/ViewSupplier';
import EditSupplier from './pages/admin/supplier/EditSupplier';

// Protects routes based on user role
const ProtectedRoute = ({ children, requiredRole }) => {
  const userRole = localStorage.getItem('userRole');
  console.log(userRole);

  // If no user role exists, redirect to login
  if (!userRole) {
    return <Navigate to="/login" replace />;
  }

  // If user role doesn't match the required role, redirect to home or a different page
  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children; // Render the children (nested routes)
};

const App = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forget/password" element={<ForgetPassword />} />
      <Route path="/" element={<Home />} />

      {/* Protected Routes for Admin */}
      <Route path="/admin" element={<ProtectedRoute requiredRole="admin"><AdminLayout /></ProtectedRoute>}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="supplier" element={<Supplier/>} />
        <Route path="supplier/add" element={<AddSupplier/>} />
        <Route path="supplier/view/:id" element={<ViewSupplier/>} />
        <Route path="supplier/edit/:id" element={<EditSupplier/>} />
      </Route>

      {/* Protected Routes for User */}
      <Route path="/user" element={<ProtectedRoute requiredRole="user"><UserLayout /></ProtectedRoute>}>
        <Route path="dashboard" element={<UserDashboard />} />
      </Route>

      {/* Additional Routes */}
      <Route element={<Super />}>
        <Route path="/otp/verify" element={<VerifyOtp />} />
        <Route path="/password/update" element={<UpdatePassword />} />
      </Route>
    </Routes>
  );
};

export default App;
