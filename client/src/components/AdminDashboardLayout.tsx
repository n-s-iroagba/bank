import React from "react";
import { faBank, faUserAlt, faUsers } from "@fortawesome/free-solid-svg-icons";
import SideBarLayout from "./SideBarLayout";

interface AdminDashboardProps {
  children: React.ReactNode;
  superAdminId:number|null
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ children,superAdminId=null }) => {
    
    const navItems = [
      {icon:faBank, label:'Banks', path:'/admin/banks'},
        { icon: faUsers, label: "Account Holders", path:`/admin/account-holders/`  },
        { icon: faUserAlt, label: "Second Parties", path: `/admin/second-parties/`  },

      ];
  return (
    <SideBarLayout  navItems={navItems} superAdminId ={superAdminId}>
      {children}
    </SideBarLayout>
  );
};

export default AdminDashboard;