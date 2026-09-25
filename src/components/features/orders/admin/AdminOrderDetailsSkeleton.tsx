import TextFieldSkeleton from "@/components/common/TextFieldSkeleton";

export default function AdminOrderDetailsSkeleton() {
  return (
    <div className="flex flex-col gap-4 lg:gap-6">
      <section className="flex flex-col gap-4 rounded-lg border border-gray-4 p-4 lg:p-6">
        <div className="flex flex-col gap-4 border-b border-gray-4 pb-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex flex-col gap-2 text-xs lg:text-sm">
            <div className="flex items-center  gap-1">
              <div className="w-20 h-4 lg:h-5 bg-gray-2 rounded animate-pulse"></div>
              <div className="w-full lg:w-50 h-4 lg:h-5 bg-gray-2 rounded animate-pulse"></div>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-20 h-4 lg:h-5 bg-gray-2 rounded animate-pulse"></div>
              <div className="w-full lg:w-50 h-4 lg:h-5 bg-gray-2 rounded animate-pulse"></div>
            </div>
          </div>
          <div className="flex min-w-40 lg:min-w-45 flex-col gap-1.5">
            <div className="w-20 lg:w-full h-4 lg:h-5 bg-gray-2 rounded animate-pulse"></div>
            <TextFieldSkeleton />
          </div>
        </div>
        <div className="grid gap-3 text-xs lg:text-sm md:grid-cols-2">
          <div className="flex items-center gap-1">
            <div className="flex items-center gap-1 text-gray-8">
              <div className="size-4 lg:size-5 bg-gray-2 rounded animate-pulse"></div>
              <div className="w-15 lg:w-18.5 h-4 lg:h-5 bg-gray-2 rounded animate-pulse"></div>
            </div>
            <span className="w-full lg:w-46 h-4 lg:h-5 bg-gray-2 rounded animate-pulse"></span>
          </div>
          <div className="flex items-center gap-1">
            <div className="flex items-center gap-1 text-gray-8">
              <div className="size-4 lg:size-5 bg-gray-2 rounded animate-pulse"></div>
              <div className="w-15 lg:w-18.5 h-4 lg:h-5 bg-gray-2 rounded animate-pulse"></div>
            </div>
            <span className="w-full lg:w-46 h-4 lg:h-5 bg-gray-2 rounded animate-pulse"></span>
          </div>
          <div className="flex items-center gap-1">
            <div className="flex items-center gap-1 text-gray-8">
              <div className="size-4 lg:size-5 bg-gray-2 rounded animate-pulse"></div>
              <div className="w-15 lg:w-18.5 h-4 lg:h-5 bg-gray-2 rounded animate-pulse"></div>
            </div>
            <span className="w-full lg:w-46 h-4 lg:h-5 bg-gray-2 rounded animate-pulse"></span>
          </div>
          <div className="flex items-center gap-1">
            <div className="flex items-center gap-1 text-gray-8">
              <div className="size-4 lg:size-5 bg-gray-2 rounded animate-pulse"></div>
              <div className="w-15 lg:w-18.5 h-4 lg:h-5 bg-gray-2 rounded animate-pulse"></div>
            </div>
            <span className="w-full lg:w-46 h-4 lg:h-5 bg-gray-2 rounded animate-pulse"></span>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-4 rounded-lg border border-gray-4 p-4 lg:p-6">
        <div className="w-20 lg:w-25 h-5 lg:h-7 bg-gray-2 rounded animate-pulse"></div>
        <div className="flex flex-col divide-y divide-gray-4">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="flex items-center gap-3 py-3 first:pt-0 last:pb-0"
            >
              <div className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-gray-2 animate-pulse lg:size-20"></div>

              <div className="flex min-w-0 flex-1 flex-col gap-1">
                <div className="h-4 w-full rounded bg-gray-2 animate-pulse lg:h-5 lg:w-50"></div>
                <div className="h-4 w-full rounded bg-gray-2 animate-pulse"></div>
                <div className="h-4 w-12.5 rounded bg-gray-2 animate-pulse"></div>
              </div>

              <div className="flex shrink-0 flex-col items-end gap-1 text-xs lg:text-sm">
                <div className="h-4 w-17.5 rounded bg-gray-2 animate-pulse lg:w-25"></div>
                <div className="h-4 w-17.5 rounded bg-gray-2 animate-pulse lg:w-25"></div>
                <div className="h-4 w-17.5 rounded bg-gray-2 animate-pulse lg:w-30"></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-lg border border-gray-4 p-4 lg:p-6">
        <div className="flex flex-col divide-y divide-gray-4">
          {[...Array(7)].map((_, index) => (
            <div
              key={index}
              className="flex items-center justify-between pb-3 lg:pb-4 mb-3 lg:mb-4 last:pb-0 last:lg:pb-0 last:mb-0"
            >
              <div className="w-20 lg:w-25 h-4 lg:h-5 bg-gray-2 rounded animate-pulse"></div>
              <div className="w-20 lg:w-25 h-4 lg:h-5 bg-gray-2 rounded animate-pulse"></div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
