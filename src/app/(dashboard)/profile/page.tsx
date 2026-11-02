import type { Metadata } from "next";

import DashboardHeader from "@/components/layouts/dashboard/DashboardHeader";
import ProfileFormContainer from "@/components/features/profile/ProfileFormContainer";

export const metadata: Metadata = {
  title: "پروفایل من",
};

const Profile = () => {
  return (
    <>
      <DashboardHeader title="پروفایل من" />
      <ProfileFormContainer />
    </>
  );
};

export default Profile;
