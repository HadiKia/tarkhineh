import BranchFormContainer from "@/components/features/branches/BranchFormContainer";
import DashboardHeader from "@/components/layouts/dashboard/DashboardHeader";
import { ADMIN_BRANCHES_PATH } from "@/constants/branches";

const AddBranch = () => {
  return (
    <>
      <DashboardHeader title="ایجاد شعبه" backHref={ADMIN_BRANCHES_PATH} />
      <BranchFormContainer />
    </>
  );
};

export default AddBranch;
