import React from "react";
import { faUser, faBank, faMoneyBillTransfer } from "@fortawesome/free-solid-svg-icons";
import AdminDashboardLayout from "./AdminDashboardLayout";

interface AccountHolderLayoutProps {
  children: React.ReactNode;
  id: number;
}

const AccountHolderLayout: React.FC<AccountHolderLayoutProps> = ({ children, id }) => {
  const accountHolderNavItems = [
    { icon: faUser, label: "Account Holder Details", path: `/admin/account-holder-details/${id}` },
    { icon: faBank, label: "Checking Account", path: `/admin/checking-account/${id}` },
    { icon: faBank, label: "TermDeposit Account", path: `/admin/term-deposit-account/${id}` },
    { icon: faMoneyBillTransfer, label: "Transactions", path: `/admin/transactions/${id}` },
  ];

  return (
    <AdminDashboardLayout navItems={accountHolderNavItems}>
      {children}
    </AdminDashboardLayout>
  );
};

export default AccountHolderLayout;
