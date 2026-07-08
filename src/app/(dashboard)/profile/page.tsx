import DashboardHeader from "@/components/layouts/dashboard/DashboardHeader";
import ProfileFormContainer from "@/components/features/profile/ProfileFormContainer";

const Profile = () => {
  return (
    <>
      <DashboardHeader title="پروفایل من" />
      <ProfileFormContainer />
    </>
  );
};

export default Profile;
