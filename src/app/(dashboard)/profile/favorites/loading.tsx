import TextFieldSkeleton from "@/components/common/TextFieldSkeleton";
import DashboardHeader from "@/components/layouts/dashboard/DashboardHeader";

export default function ProfileFavoritesLoading() {
  return (
    <>
      <DashboardHeader title="علاقمندی‌ها" />

      <div className="flex flex-col gap-6 lg:gap-10">
        <div className="flex flex-col justify-between md:flex-row gap-5 lg:gap-10 md:items-center">
          <div className="min-w-0 lg:max-w-xs xl:max-w-105 flex items-center gap-x-2 overflow-hidden">
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className="min-w-20 h-6 lg:h-8 rounded-lg lg:rounded-full bg-gray-2 animate-pulse "
              />
            ))}
          </div>

          <div className="w-full md:max-w-sm xl:min-w-87.5">
            <TextFieldSkeleton />
          </div>
        </div>

        <div className="grid grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-5 lg:gap-y-6">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded lg:rounded-lg border border-gray-4 bg-white flex flex-col h-full"
            >
              <div className="relative block h-26 lg:h-35 w-full bg-gray-2 animate-pulse"></div>

              <div className="flex flex-1 flex-col justify-between p-2 lg:p-4">
                <div className="mb-2 flex items-start justify-between gap-3">
                  <div className="w-full h-4 lg:h-7 rounded lg:rounded-md bg-gray-2 animate-pulse"></div>

                  <div className="shrink-0 size-4 lg:size-7 rounded lg:rounded-md bg-gray-2 animate-pulse"></div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 mb-2 lg:mb-6">
                  <div className="md:hidden">
                    <div className="flex items-center gap-1 rounded">
                      <div className="size-4 rounded bg-gray-2 animate-pulse"></div>
                      <div className="size-4 rounded bg-gray-2 animate-pulse"></div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="w-31 h-6 rounded lg:rounded-md bg-gray-2 animate-pulse" />
                  </div>

                  <div className="flex items-center gap-1 text-xs text-gray-8 lg:text-base">
                    <div className="w-9 lg:w-12 h-4 lg:h-6 rounded lg:rounded-md bg-gray-2 animate-pulse" />
                    <div className="w-7 lg:w-8 h-4 lg:h-6 rounded lg:rounded-md bg-gray-2 animate-pulse" />
                  </div>
                </div>

                <div className="w-full h-8 lg:h-10 rounded lg:rounded-md bg-gray-2 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
