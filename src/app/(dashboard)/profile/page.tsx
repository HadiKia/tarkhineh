import DashboardHeader from "@/components/layouts/dashboard/DashboardHeader";
import ProfileFormContainer from "@/components/features/profile/ProfileFormContainer";

const Profile = () => {
  return (
    <div>
      <DashboardHeader title="پروفایل من" />

      <ProfileFormContainer />
    </div>
  );
};

export default Profile;
