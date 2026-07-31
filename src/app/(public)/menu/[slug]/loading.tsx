import { Button } from "@/components/ui/button";
import { ArrowLeft2, ArrowRight } from "iconsax-reactjs";

export default function MenuProductLoading() {
  const breadcrumbSkeletonWidths = [
    "w-5 lg:w-8",
    "w-14 lg:w-20",
    "w-14 lg:w-20",
    "w-14 lg:w-20",
  ];

  return (
    <div className=" mb-6 md:pb-12">
      <div className="bg-primary">
        <div className="max-w-306 mx-auto px-4 xl:px-0 py-2 lg:py-3 flex items-center justify-between">
          <Button disabled variant="link" className="text-white px-0">
            <ArrowRight className="size-6" />
          </Button>
          <h2 className="flex-1 text-center text-white text-xl font-bold lg:text-2xl">
            جزئیات محصول
          </h2>

          <div className="size-6.5" />
        </div>
      </div>

      <div className="max-w-306 mx-auto px-4 xl:px-0">
        <nav
          aria-label="Breadcrumb"
          className="border-b border-gray-3 py-4 lg:py-6 mb-4 lg:mb-6"
        >
          <ol className="flex flex-wrap items-center gap-1 lg:gap-2">
            {breadcrumbSkeletonWidths.map((widthClass, index) => {
              const isLast = index === breadcrumbSkeletonWidths.length - 1;

              return (
                <li key={index} className="flex items-center gap-x-1">
                  <div className={widthClass}>
                    <div className="h-4 lg:h-5 w-full animate-pulse rounded bg-gray-2" />
                  </div>

                  {!isLast && (
                    <ArrowLeft2 className="size-4 text-gray-7 lg:size-5" />
                  )}
                </li>
              );
            })}
          </ol>
        </nav>

        <div className="grid grid-cols-1 gap-6 lg:gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="relative h-52 overflow-hidden rounded-lg lg:rounded-2xl lg:h-auto lg:aspect-square bg-gray-2 animate-pulse" />
          </div>

          <div className="lg:col-span-8">
            <div className="flex items-center justify-between mb-4">
              <div className="w-32 lg:w-40 h-6 lg:h-8 rounded-md bg-gray-2 animate-pulse" />
              <div className="flex items-center gap-4 relative">
                <div className="size-6 rounded-md bg-gray-2 animate-pulse" />
                <div className="size-6 rounded-md bg-gray-2 animate-pulse" />
              </div>
            </div>

            <div className="flex flex-col gap-y-2 lg:gap-y-4 px-2 py-1 lg:px-4 lg:py-2 border border-gray-4 rounded-lg divide-y divide-gray-4 mb-6">
              <div className="flex flex-col gap-y-1 pb-2 lg:pb-4">
                <div className="w-13 lg:w-18 h-5 lg:h-7 rounded-md bg-gray-2 animate-pulse" />
                <div className="w-full h-4 lg:h-6 rounded-md bg-gray-2 animate-pulse" />
              </div>
              <div className="flex items-center justify-between pb-2 lg:pb-4">
                <div className="w-13 lg:w-18 h-5 lg:h-7 rounded-md bg-gray-2 animate-pulse" />

                <div className="flex items-center gap-1">
                  <div className="w-8 lg:w-10 h-4 lg:h-6 rounded-sm bg-gray-2 animate-pulse" />
                  <div className="w-20 lg:w-31 h-4 lg:h-6 rounded-sm bg-gray-2 animate-pulse" />
                </div>
              </div>
              <div className="flex items-center justify-between pb-2">
                <div className="w-13 lg:w-18 h-5 lg:h-7 rounded-md bg-gray-2 animate-pulse" />
                <div className="flex items-center gap-2">
                  <div className="w-14 h-5 lg:h-7 rounded-sm bg-gray-2 animate-pulse" />
                  <div className="w-8 lg:w-10 h-5 lg:h-7 rounded-sm bg-gray-2 animate-pulse" />
                </div>
              </div>
            </div>

            <div className="mx-auto block lg:me-0 w-38 lg:w-61 h-8 lg:h-10 rounded-sm bg-gray-2 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
