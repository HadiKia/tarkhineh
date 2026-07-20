export default function ProductGridSkeleton() {
  return (
    <div className="mx-auto max-w-306 px-4 xl:px-0 flex flex-col lg:grid lg:grid-cols-2 gap-3 lg:gap-6 mb-6 mb:pb-12">
      {[...Array(4)].map((_, index) => (
        <div
          key={index}
          className="flex overflow-hidden rounded-sm border border-gray-4 bg-white transition-opacity lg:rounded-lg"
        >
          <div className="relative w-23 shrink-0 lg:w-42.5  bg-gray-2 animate-pulse" />

          <div className="flex min-w-0 flex-1 flex-col justify-between gap-2 p-2 lg:relative lg:gap-2.75 lg:ps-8 lg:pe-4">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <div className="w-25 xl:w-65 h-4.5 lg:h-6 rounded-sm bg-gray-2 animate-pulse"></div>
              </div>

              <div className="flex items-center gap-2 lg:hidden">
                <div className="w-8 h-4.5 rounded-sm bg-gray-2 animate-pulse"></div>
                <div className="w-8 h-4.5 rounded-sm bg-gray-2 animate-pulse"></div>
              </div>
            </div>

            <div className="flex items-center justify-between gap-2 lg:gap-4">
              <div className="min-w-0 flex-1 flex flex-col gap-1.5">
                <div className="w-full xl:w-65 h-4.5 lg:h-4 rounded-sm bg-gray-2 animate-pulse"></div>
                <div className="hidden xl:block w-43.75 lg:h-4 rounded-sm bg-gray-2 animate-pulse"></div>
              </div>

              <div className="flex shrink-0 flex-col gap-3 items-end justify-center">
                <div className="hidden items-center gap-2 lg:flex">
                  <div className="w-8 lg:w-13 h-5 rounded-sm bg-gray-2 animate-pulse"></div>
                  <div className="w-8 h-5 rounded-sm bg-gray-2 animate-pulse"></div>
                </div>

                <div className="w-full lg:w-25.75 h-5 lg:h-6 rounded-sm bg-gray-2 animate-pulse"></div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 lg:gap-5">
              <div className="flex flex-1 items-center gap-2">
                <div className="shrink-0 size-4 lg:absolute lg:top-2 lg:inset-e-4 lg:size-6 rounded-sm bg-gray-2 animate-pulse"></div>
                <div className="w-20 lg:w-28.75 h-4 lg:h-6 rounded-sm bg-gray-2 animate-pulse"></div>
              </div>

              <div className="flex-1 min-w-28.75 xl:min-w-61 h-8 lg:h-10 rounded-sm bg-gray-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
