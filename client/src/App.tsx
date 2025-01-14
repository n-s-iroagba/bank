import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EmailVerification from './pages/admin/EmailVerification';
import SignUp from './pages/admin/SignUp';
import Dashboard from './pages/client/Dashboard';
import Home from './pages/client/Home';
import Login from './pages/client/Login';
import MakeDebit from './pages/client/MakeDebit';
import AdminLogin from './pages/admin/AdminLogin';





const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/client/debit" element={<MakeDebit/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
       
        <Route path="/super-admin/signup" element={<SignUp/>} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/verify-email" element={<EmailVerification />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
