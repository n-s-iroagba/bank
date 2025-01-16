import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EmailVerification from './pages/admin/EmailVerification';
import SignUp from './pages/admin/SignUp';
import Dashboard from './pages/client/Dashboard';
import Home from './pages/client/Home';
import Login from './pages/client/Login';
import MakeDebit from './pages/client/MakeDebit';
import AdminLogin from './pages/admin/AdminLogin';
import AccountHolderList from './pages/admin/AccountHolderList';
import SecondPartyList from './pages/admin/SecondPartyList';
import BankList from './pages/admin/BankList';
import AccountHolderDetails from './pages/admin/AccountHolderDetails';
import AdminCheckingAccountDetails from './pages/admin/AdminCheckingAccountDetails';
import AdminTermDepositDetails from './pages/admin/AdminTermDepositDetails';
import AdminTransactionList from './pages/admin/AdminTransactionList';
import AdminList from './pages/admin/AdminList';
import ForgotPassword from './pages/admin/ForgotPassword';
import NewPassword from './pages/admin/NewPassword';






const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/client/debit" element={<MakeDebit/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path='/admin/account-holders/:id' element={<AccountHolderList/>}/>
        <Route path='/admin/second-parties/:id' element={<SecondPartyList />}/>
        <Route path='/super-admin/banks' element={<BankList/>}/>
        <Route path='/super-admin/admins/:id' element={<AdminList/>}/>

        <Route path='/admin/account-holder-details/:id' element={<AccountHolderDetails/>}/>
        <Route path='/admin/checking-account/:id' element={<AdminCheckingAccountDetails/>}/>
        <Route path='/admin/term-deposit-account/:id' element={<AdminTermDepositDetails/>}/>
        <Route path='/admin/transactions/:id' element={<AdminTransactionList/>}/>
    
        <Route path="/super-admin/signup" element={<SignUp/>} />
        <Route path="/super-admin/login" element={<AdminLogin isSuperAdmin = {true} />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/verify-email" element={<EmailVerification />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/new-password" element={<NewPassword />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
