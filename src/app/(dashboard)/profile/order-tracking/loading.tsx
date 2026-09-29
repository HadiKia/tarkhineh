import { cn } from "@/lib/utils";
import DashboardHeader from "@/components/layouts/dashboard/DashboardHeader";

export default function ProfileOrderTrackingsLoading() {
  return (
    <>
      <DashboardHeader title="سفارشات" />

      <div className="flex flex-col gap-6 lg:gap-10">
        <div className="min-w-0 lg:max-w-xs xl:max-w-105 flex items-center gap-x-2 overflow-hidden">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="min-w-22 h-6 lg:h-8 rounded-lg lg:rounded-full bg-gray-2 animate-pulse "
            />
          ))}
        </div>
        <div className="flex flex-col gap-3 lg:gap-4 lg:h-[calc(100dvh-30em)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-5">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="border border-gray-4 rounded-lg lg:rounded px-3 py-2 lg:px-6 lg:py-4"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="h-4 lg:h-5 w-20 rounded bg-gray-2 animate-pulse" />
                <div className="flex items-center gap-2">
                  <div className="h-5 lg:h-6 w-20 lg:w-28 rounded bg-gray-2 animate-pulse" />
                  <div className="h-5 lg:h-6 w-20 lg:w-28 rounded bg-gray-2 animate-pulse" />
                </div>
              </div>

              <div className="flex flex-col gap-2 mb-4">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="flex items-start gap-1">
                    <div className="size-4 rounded bg-gray-2 animate-pulse" />
                    <div className="h-4 w-38 lg:w-50 rounded bg-gray-2 animate-pulse" />
                  </div>
                ))}
              </div>

              <div className="mb-4 overflow-x-auto scrollbar-none">
                <div className="flex min-w-max items-center">
                  <div className="flex flex-1 items-center last:flex-none">
                    <div className="flex items-center gap-1 whitespace-nowrap pe-1 lg:pe-2 text-primary text-base">
                      <div className="size-4 lg:size-6 bg-gray-2 rounded animate-pulse"></div>
                      <div className="hidden lg:block w-30 h-5 bg-gray-2 rounded animate-pulse"></div>
                    </div>
                    <span
                      aria-hidden="true"
                      className="relative h-px flex-1 border-t-2 border-dashed border-gray-4"
                    ></span>
                  </div>
                  <div className="flex flex-1 items-center last:flex-none">
                    <div className="flex items-center gap-1 whitespace-nowrap px-1 lg:px-2 text-primary text-base font-bold">
                      <div className="size-4 lg:size-6 bg-gray-2 rounded animate-pulse"></div>
                      <div className="hidden lg:block w-30 h-5 bg-gray-2 rounded animate-pulse"></div>
                    </div>
                    <span
                      aria-hidden="true"
                      className="relative h-px flex-1 border-t-2 border-dashed border-gray-4"
                    ></span>
                  </div>
                  <div className="flex flex-1 items-center last:flex-none">
                    <div className="flex items-center gap-1 whitespace-nowrap text-sm text-gray-4 ps-1 lg:ps-2">
                      <div className="size-4 lg:size-6 bg-gray-2 rounded animate-pulse"></div>
                      <div className="hidden lg:block w-30 h-5 bg-gray-2 rounded animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 lg:gap-4">
                {[...Array(6)].map((_, index) => (
                  <div
                    key={index}
                    className={cn(
                      "flex flex-col border border-gray-4 rounded-lg overflow-hidden",
                      index === 3 && "hidden md:flex",
                      index >= 4 && "hidden lg:flex",
                    )}
                  >
                    <div className="relative aspect-video h-12 md:h-20 bg-gray-2 animate-pulse" />
                    <div className="px-2 py-1 flex flex-col gap-1">
                      <div className="h-4 w-full rounded bg-gray-2 animate-pulse" />
                      <div className="h-4 w-full rounded bg-gray-2 animate-pulse" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
