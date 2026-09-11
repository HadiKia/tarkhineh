import TextFieldSkeleton from "@/components/common/TextFieldSkeleton";
import CartCheckoutSummarySkeleton from "./CartCheckoutSummarySkeleton";

function PaymentStepContentSkeleton() {
  return (
    <section className="lg:col-span-8 xl:col-span-7 flex flex-col gap-3 lg:gap-6">
      <div className="rounded-lg border border-gray-4 p-4 lg:p-6 flex flex-col gap-2 lg:flex-row lg:items-stretch lg:justify-start lg:gap-10">
        <div className="flex items-center gap-1 lg:gap-2 pb-2 border-b border-gray-4 shrink-0 mb-2 lg:border-none lg:pb-0 lg:mb-0">
          <div className="size-4 lg:size-6 bg-gray-2 rounded animate-pulse"></div>
          <div className="h-5 lg:h-6 w-22 bg-gray-2 animate-pulse"></div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-full lg:w-80">
            <TextFieldSkeleton />
          </div>
          <div className="w-12.5 lg:w-25">
            <TextFieldSkeleton />
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-gray-4 p-4 lg:px-6 lg:py-8 flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-1 lg:gap-2 pb-2 border-b border-gray-4 shrink-0 mb-2 lg:border-none lg:pb-0 lg:mb-0">
          <div className="size-4 lg:size-6 bg-gray-2 rounded animate-pulse"></div>
          <div className="h-5 lg:h-6 w-22 bg-gray-2 animate-pulse"></div>
        </div>
        <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-evenly flex-1">
          <div className="flex cursor-pointer items-center gap-2 h-4 lg:h-11 w-32.5 lg:w-50 bg-gray-2 rounded animate-pulse"></div>
          <div className="flex cursor-pointer items-center gap-2 h-4 lg:h-11 w-32.5 lg:w-50 bg-gray-2 rounded animate-pulse"></div>
        </div>
      </div>

      <div className="rounded-lg border border-gray-4 p-4 lg:p-6 flex flex-col gap-2 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex items-center gap-1 lg:gap-2 pb-2 border-b border-gray-4 shrink-0 mb-2 lg:border-none lg:pb-0 lg:mb-0">
          <div className="size-4 lg:size-6 bg-gray-2 rounded animate-pulse"></div>
          <div className="h-5 lg:h-6 w-22 bg-gray-2 animate-pulse"></div>
        </div>

        <div className="flex flex-col items-center justify-center gap-2 flex-1">
          <div className="flex items-center gap-4">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="relative size-16.5 lg:size-24.5 rounded bg-gray-2 animate-pulse"
              ></div>
            ))}
          </div>

          <div className="w-full lg:w-[60%] flex flex-col gap-1 items-center">
            <div className="w-full rounded bg-gray-2 animate-pulse h-4 lg:h-5"></div>
            <div className="w-[90%] rounded bg-gray-2 animate-pulse h-4"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function CartPaymentPageSkeleton() {
  return (
    <div
      className="grid grid-cols-1 items-start gap-3 lg:grid-cols-12 lg:gap-6"
      aria-busy="true"
      aria-label="در حال بارگذاری سبد خرید"
    >
      <PaymentStepContentSkeleton />
      <CartCheckoutSummarySkeleton />
    </div>
  );
}
