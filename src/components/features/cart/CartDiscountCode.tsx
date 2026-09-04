import TextField from "@/components/common/TextField";
import { Button } from "@/components/ui/button";
import { DiscountShape } from "iconsax-reactjs";

export default function CartDiscountCode() {
  return (
    <div className="rounded-lg border border-gray-4 p-4 lg:px-6 lg:py-8 flex flex-col gap-2 lg:flex-row lg:items-stretch lg:justify-center lg:gap-10">
      <h3 className="flex items-center gap-1 pb-2 border-b border-gray-4 mb-2 lg:border-none lg:pb-0 lg:mb-0 text-sm lg:text-base text-gray-8">
        <DiscountShape className="size-4 lg:size-6" />
        ثبت کد تخفیف
      </h3>

      <div className="flex items-start gap-4">
        <TextField
          id="coupon"
          label=""
          placeholder="کد تخفیف"
          className="lg:w-80"
        />
        <Button className="lg:w-25">ثبت کد</Button>
      </div>
    </div>
  );
}
