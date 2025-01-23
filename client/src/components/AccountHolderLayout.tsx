import React from "react";
import { faUser, faBank, faMoneyBillTransfer } from "@fortawesome/free-solid-svg-icons";
import SadminIdeBarLayout from "./SideBarLayout";

interface AccountHolderLayoutProps {
  children: React.ReactNode;
}

const AccountHolderLayout: React.FC<AccountHolderLayoutProps> = ({ children }) => {
  const adminId = 2
  const accountHolderNavItems = [
    { icon: faUser, label: "Account Holder Details", path: `/admin/account-holder-details/${adminId}` },
    { icon: faBank, label: "Checking Account", path: `/admin/checking-account/${adminId}` },
    { icon: faBank, label: "TermDeposit Account", path: `/admin/term-deposit-account/${adminId}` },
    { icon: faMoneyBillTransfer, label: "Transactions", path: `/admin/transactions/${adminId}` },
  ];

  return (
    <SadminIdeBarLayout navItems={accountHolderNavItems}>
      {children}
    </SadminIdeBarLayout>
  );
};

export default AccountHolderLayout;
