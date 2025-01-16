import React from "react";
import { faUserAlt, faUsers } from "@fortawesome/free-solid-svg-icons";
import SideBarLayout from "./SideBarLayout";

interface AdminDashboardProps {
  children: React.ReactNode;
  adminId: number;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ children, adminId }) => {
    const superAdminId = 1
    const navItems = [
        { icon: faUsers, label: "Account Holders", path:`/admin/account-holders/${adminId}`  },
        { icon: faUserAlt, label: "Second Parties", path: `/admin/second-parties/${adminId}`  },  
      ];
  return (
    <SideBarLayout  navItems={navItems} superAdminId ={superAdminId}>
      {children}
    </SideBarLayout>
  );
};

export default AdminDashboard;