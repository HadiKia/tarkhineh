import type { Metadata } from "next";
import DashboardHeader from "@/components/layouts/dashboard/DashboardHeader";

export const metadata: Metadata = {
  title: "مدیریت",
};

const AdminPage = () => {
  return (
    <div>
      <DashboardHeader title="مدیریت" />
      <span>AdminPage</span>
    </div>
  );
};

export default AdminPage;
