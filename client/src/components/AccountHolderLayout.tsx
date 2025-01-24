import React from "react";
import { faUser, faBank, faMoneyBillTransfer } from "@fortawesome/free-solid-svg-icons";
import SideBarLayout from "./SideBarLayout";

interface AccountHolderLayoutProps {
  children: React.ReactNode;
  accountHolderId:string
}

const AccountHolderLayout: React.FC<AccountHolderLayoutProps> = ({ children,accountHolderId }) => {
  
  const accountHolderNavItems = [
    { icon: faUser, label: "Account Holder Details", path: `/admin/account-holder-details/${accountHolderId}` },
    { icon: faBank, label: "Checking Account", path: `/admin/checking-account/${accountHolderId}` },
    { icon: faBank, label: "TermDeposit Account", path: `/admin/term-deposit-account/${accountHolderId}` },
    { icon: faMoneyBillTransfer, label: "Transactions", path: `/admin/transactions/${accountHolderId}` },
  ];

  return (
    <SideBarLayout superAdminId={null} navItems={accountHolderNavItems}>
      {children}
    </SideBarLayout>
  );
};

export default AccountHolderLayout;
