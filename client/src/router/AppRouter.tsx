import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Layout components
import Banks from "../pages/admin/Banks";
import SecondParties from "../pages/admin/SecondParties";
import AccountHolders from "../pages/admin/AccountHolders";
import CheckingAccounts from "../pages/admin/CheckingAccounts";
import FixedDeposits from "../pages/admin/FixedDeposits";
import Transactions from "../pages/admin/Transactions";

import NotFound from "../pages/NotFound";
import Dashboard from "../pages/accountHolder/Dashboard";
import MakeDebit from "../pages/accountHolder/MakeDebit";
import AccountHolderDetailsPage from "../pages/admin/AccountHolderDetail";
import FixedTermDepositDetailsPage from "../pages/admin/FixedDepositDetailsPage";
import CheckingAccountDetailsPage from "../pages/admin/CheckingAccountDetails";
import Login from "../pages/accountHolder/Login";
import AdminLoginForm from "../pages/auth/AdminLogin";
import Register from "../pages/auth/Register";
import ProtectedRoute from "../components/ui/ProtectedRoute";
import Home from "../pages/accountHolder/Home";
import AdminSidebar from "../components/admin/SideBar";

// App router component
const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login />} />
      <Route path="/admin/login" element={<AdminLoginForm />} />
      <Route path="/register" element={<Register />} />
      <Route 
      // element={<ProtectedRoute allowedRoles={["admin"]} />}
      >
        <Route path="/admin" element={<AdminSidebar />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AccountHolders />} />
          <Route path="banks" element={<Banks />} />
          <Route path="second-parties" element={<SecondParties />} />
          <Route path="account-holders" element={<AccountHolders />} />
          <Route path="account-holder/:id" element={<AccountHolderDetailsPage />} />
          <Route path="account-holder/:id/checking" element={<CheckingAccounts />} />
          <Route path="account-holder/:id/fixed" element={<FixedDeposits />} />
          <Route
            path="account-holder/:id/checking/:accountId"
            element={<CheckingAccountDetailsPage />}
          />
          <Route
            path="account-holder/:id/fixed/:accountId"
            element={<FixedTermDepositDetailsPage />}
          />
          <Route path="transactions/:accountId" element={<Transactions />} />
        </Route>
      </Route>
 

      {/* Account holder routes */}
      <Route 
      // element={<ProtectedRoute allowedRoles={["account_holder"]} />}
      >
        <Route path="/account-holder">
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="transfer" element={<MakeDebit />} />
        </Route>
      </Route>

      {/* Common routes */}
      <Route
        path="/unauthorized"
        element={
          <NotFound message="You are not authorized to access this page" />
        }
      />
      <Route
        path="/not-found"
        element={<NotFound message="Page not found" />}
      />
      <Route path="*" element={<NotFound message="Page not found" />} />
    </Routes>
  );
};

export default AppRouter;
