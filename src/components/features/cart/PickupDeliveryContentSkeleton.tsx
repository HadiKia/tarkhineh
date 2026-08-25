export default function PickupDeliveryContentSkeleton() {
  return (
    <section
      aria-label="اطلاعات تحویل حضوری"
      className="rounded-lg border border-gray-4 p-4 lg:px-6 lg:py-4"
    >
      <div className="flex items-center gap-1 pb-2 border-b border-gray-4 mb-4 lg:mb-3">
        <div className="size-5 lg:size-6 bg-gray-2 animate-pulse rounded" />
        <div className="w-24 h-5 lg:h-6 bg-gray-2 animate-pulse rounded" />
      </div>

      <div className="flex flex-col gap-2 text-xs lg:text-sm text-gray-7 px-3 lg:px-0">
        <div className="w-full h-4 lg:h-5 bg-gray-2 animate-pulse rounded" />

        <div className="flex flex-col gap-1">
          <div className="flex items-center flex-wrap gap-x-2">
            <div className="w-18 lg:w-22 h-4 lg:h-5 bg-gray-2 animate-pulse rounded" />
            <div className="w-18 lg:w-22 h-4 lg:h-5 bg-gray-2 animate-pulse rounded" />
          </div>
          <div className="flex items-center flex-wrap gap-x-2">
            <div className="w-18 lg:w-22 h-4 lg:h-5 bg-gray-2 animate-pulse rounded" />
            <div className="w-18 lg:w-22 h-4 lg:h-5 bg-gray-2 animate-pulse rounded" />
          </div>
        </div>

        <div className="flex items-center gap-x-2">
          <div className="shrink-0 w-18 lg:w-22 h-4 lg:h-5 bg-gray-2 animate-pulse rounded" />
          <div className="w-full h-4 lg:h-5 bg-gray-2 animate-pulse rounded" />
        </div>
      </div>
    </section>
  );
}
