import AdminDashboardWrapper from "@/components/admin/AdminDashboardWrapper";
import React, { ReactNode } from "react";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  return (
    <AdminDashboardWrapper>
      <div className="md:px-6 md:py-3 min-h-screen  bg-stone-100">
        {children}
      </div>
    </AdminDashboardWrapper>
  );
};

export default AdminLayout;
