import CategoryFormContainer from "@/components/features/categories/CategoryFormContainer";
import DashboardHeader from "@/components/layouts/dashboard/DashboardHeader";
import { ADMIN_CATEGORIES_PATH } from "@/constants/categories";

const AddCategory = () => {
  return (
    <>
      <DashboardHeader title="ایجاد دسته‌بندی" backHref={ADMIN_CATEGORIES_PATH} />
      <CategoryFormContainer />
    </>
  );
};

export default AddCategory;
