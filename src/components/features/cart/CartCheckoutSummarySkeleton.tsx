import TextFieldSkeleton from "@/components/common/TextFieldSkeleton";
import { cn } from "@/lib/utils";

const getSkeletonColor = (index: number) =>
  index % 2 === 1 ? "bg-gray-3" : "bg-gray-2";

export default function CartCheckoutSummarySkeleton() {
  return (
    <aside className="lg:col-span-4 xl:col-span-5 border border-gray-4 p-6 rounded-lg">
      <div className="hidden lg:flex items-center justify-between lg:mb-3">
        <div className="w-20 h-6 bg-gray-2 animate-pulse rounded" />
        <div className="size-4 lg:size-6 bg-gray-2 animate-pulse rounded" />
      </div>
      <div className="hidden lg:flex mb-4 flex-col min-h-0 h-52 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-5 *:odd:bg-gray-1 *:even:bg-gray-2">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="flex shrink-0 gap-2 overflow-hidden p-2">
            <div className="flex items-center justify-between flex-1 gap-2">
              <div className="w-full flex flex-col gap-2">
                <div
                  className={cn(
                    "w-1/2 h-4 animate-pulse rounded",
                    getSkeletonColor(index),
                  )}
                />
                <div className="flex items-center gap-1.5">
                  <div
                    className={cn(
                      "w-8 h-4 animate-pulse rounded",
                      getSkeletonColor(index),
                    )}
                  />
                  <div
                    className={cn(
                      "w-8 h-4 animate-pulse rounded",
                      getSkeletonColor(index),
                    )}
                  />
                </div>
              </div>
              <div
                className={cn(
                  "w-20 h-8 animate-pulse rounded",
                  getSkeletonColor(index),
                )}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col">
        <div className="flex items-center justify-between pb-3 lg:py-4 border-b lg:border-y border-gray-4">
          <div className="w-24 h-5 bg-gray-2 animate-pulse rounded" />
          <div className="w-20 h-5 bg-gray-2 animate-pulse rounded" />
        </div>

        <div className="flex items-center justify-between py-3 lg:py-4 font-semibold">
          <div className="w-24 h-5 bg-gray-2 animate-pulse rounded" />
          <div className="w-20 h-5 bg-gray-2 animate-pulse rounded" />
        </div>
      </div>
      <TextFieldSkeleton />
    </aside>
  );
}
