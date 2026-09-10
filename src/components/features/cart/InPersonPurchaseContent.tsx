import { Warning2 } from "iconsax-reactjs";
import CartSectionTitle from "./CartSectionTitle";

export default function InPersonPurchaseContent() {
  return (
    <div className="rounded-lg border border-gray-4 p-4 lg:px-6 lg:py-7 flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between lg:gap-11 bg-gray-1 ">
      <CartSectionTitle icon={Warning2}>قابل توجه</CartSectionTitle>
      <p className="text-xs text-gray-7">
        هزینه سفارش شما در حین تحویل کالا دریافت خواهد شد. لطفا قبل از تحویل
        کالا کارت بانکی یا پول نقد همراه خود داشته باشید و از درخواست برای
        پرداخت در زمان بعدی یا نسیه خودداری فرمایید. با تشکر از همراهی شما.
      </p>
    </div>
  );
}
