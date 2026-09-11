import AddressListSkeleton from "../address/AddressListSkeleton";
import CartCheckoutSummarySkeleton from "./CartCheckoutSummarySkeleton";

function CartDeliveryMethodSkeleton() {
  return (
    <section className="lg:col-span-8 xl:col-span-7 flex flex-col gap-3 lg:gap-6">
      <div className="rounded-lg border border-gray-4 p-4 lg:px-6 lg:py-8 flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-1 lg:gap-2 pb-2 border-b border-gray-4 shrink-0 mb-2 lg:border-none lg:pb-0 lg:mb-0">
          <div className="size-4 lg:size-6 bg-gray-2 rounded animate-pulse"></div>
          <div className="h-5 lg:h-6 w-27 lg:w-32 bg-gray-2 animate-pulse"></div>
        </div>
        <div className="flex cursor-pointer items-center gap-2 h-4 lg:h-11 w-32.5 lg:w-50 bg-gray-2 rounded animate-pulse"></div>
        <div className="flex cursor-pointer items-center gap-2 h-4 lg:h-11 w-32.5 lg:w-50 bg-gray-2 rounded animate-pulse"></div>
      </div>

      <div className="relative rounded-lg border border-gray-4 p-4 lg:px-6 lg:py-4">
        <div className="flex items-center gap-1 lg:gap-2 pb-2 border-b border-gray-4 text-sm lg:text-base text-gray-8 shrink-0 mb-4 lg:mb-3">
          <div className="size-4 lg:size-6 bg-gray-2 rounded animate-pulse"></div>
          <div className="h-5 lg:h-6 w-27 lg:w-32 bg-gray-2 animate-pulse"></div>
        </div>
        <AddressListSkeleton />
      </div>
    </section>
  );
}

export default function CartCompletionOfInformationPageSkeleton() {
  return (
    <div
      className="grid grid-cols-1 items-start gap-3 lg:grid-cols-12 lg:gap-6"
      aria-busy="true"
      aria-label="در حال بارگذاری سبد خرید"
    >
      <CartDeliveryMethodSkeleton />
      <CartCheckoutSummarySkeleton />
    </div>
  );
}
