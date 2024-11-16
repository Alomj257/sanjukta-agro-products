import React from 'react';
import { Routes, Route} from 'react-router-dom';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import ForgetPassword from './components/auth/ForgetPassword';
import VerifyOtp from './components/auth/VerifyOtp';
import UpdatePassword from './components/auth/UpdatePassword';
import Super from './components/Super';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';

const App = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home/>} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forget/password" element={<ForgetPassword />} />

      {/* Protected Routes */}
      <Route element={<Super />}>
        <Route
          path="/dashboard"
          element={
            <Dashboard />
          }
        />
        <Route
          path="/otp/verify"
          element={
            <VerifyOtp />
          }
        />
        <Route
          path="/password/update"
          element={
            <UpdatePassword />
          }
        />
      </Route>
    </Routes>
  );
};

export default App;
