"use client";

import { useBranchContext } from "@/contexts/BranchContext";
import PickupDeliveryContentSkeleton from "@/components/features/cart/PickupDeliveryContentSkeleton";
import { Location } from "iconsax-reactjs";

export default function PickupDeliveryContent() {
  const { selectedBranch, isLoading } = useBranchContext();
  const { title, address, phoneNumber1, phoneNumber2, workingHours } =
    selectedBranch ?? {};

  if (isLoading) {
    return <PickupDeliveryContentSkeleton />;
  }

  return (
    <section
      aria-label="اطلاعات تحویل حضوری"
      className="rounded-lg border border-gray-4 p-4 lg:px-6 lg:py-4"
    >
      <h3 className="flex items-center gap-1 pb-2 border-b border-gray-4 mb-4 lg:mb-3 text-sm lg:text-base text-gray-8">
        <Location className="size-4 lg:size-6" />
        {title}
      </h3>

      <div className="flex flex-col gap-2 text-xs lg:text-sm text-gray-7 px-3 lg:px-0">
        <p>{address}</p>

        <div className="flex flex-col">
          <div className="flex items-center flex-wrap gap-x-2">
            <span>شماره تماس ۱:</span>
            <span>{phoneNumber1}</span>
          </div>
          {phoneNumber2 && (
            <div className="flex items-center flex-wrap gap-x-2">
              <span>شماره تماس ۲:</span>
              <span>{phoneNumber2}</span>
            </div>
          )}
        </div>

        <div className="flex items-center flex-wrap gap-x-2">
          <span>ساعت کاری: </span>
          <span>{workingHours}</span>
        </div>
      </div>
    </section>
  );
}
