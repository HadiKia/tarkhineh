import ProductFormContainer from "@/components/features/products/ProductFormContainer";
import DashboardHeader from "@/components/layouts/dashboard/DashboardHeader";
import { ADMIN_PRODUCTS_PATH } from "@/constants/products";

const AddProduct = () => {
  return (
    <>
      <DashboardHeader title="ایجاد محصول" backHref={ADMIN_PRODUCTS_PATH} />
      <ProductFormContainer />
    </>
  );
};

export default AddProduct;
