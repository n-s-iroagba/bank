import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from '../pages/client/Login';
import Home from '../pages/client/Home';
import Dashboard from '../pages/client/Dashboard';
import AdminLogin from '../pages/admin/AdminLogin';
import EmailVerification from '../pages/admin/EmailVerification';
import PasswordRequest from '../pages/admin/PasswordRequest';
import PasswordReset from '../pages/admin/PasswordReset';
import AdminDashboard from '../pages/admin/AdminDashboard';
import Transfer from '../pages/client/Transfer';
import AdminSignUp from '../pages/admin/AdminSignUp';
import SuperAdminDashboard from '../pages/admin/SuperAdminDashboard';
import AdminDashboardWrapper from '../pages/admin/AdminDashboardWrapper';





const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/transfer" element={<Transfer/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin/dashboard/:id" element={<AdminDashboardWrapper />} />
        <Route path="/admin/dashboard" element={
       
          <AdminDashboard adminId={1} isAdmin={false} />
      
          } />
       
        <Route path="/super-admin/dashboard" element={<SuperAdminDashboard id={1} />} />
        <Route path="/admin/signup" element={<AdminSignUp />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/verify-email" element={<EmailVerification />} />
        <Route path="/reset-password-request" element={<PasswordRequest />} />
        <Route path="/reset-password" element={<PasswordReset />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
