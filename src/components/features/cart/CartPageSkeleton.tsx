import TextFieldSkeleton from "@/components/common/TextFieldSkeleton";
import { cn } from "@/lib/utils";

const getSkeletonColor = (index: number) =>
  index % 2 === 1 ? "bg-gray-3 lg:bg-gray-2" : "bg-gray-2";

function CartItemSkeleton() {
  return (
    <section className="flex flex-col min-h-0 h-50 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-5 lg:col-span-8 lg:h-[calc(100dvh-30em)] lg:gap-4 xl:col-span-7 lg:p-6 lg:border lg:border-gray-4 lg:rounded-lg *:odd:bg-gray-1 *:even:bg-gray-2 lg:*:odd:bg-transparent lg:*:even:bg-transparent">
      {[...Array(4)].map((_, index) => (
        <article
          key={index}
          className="flex shrink-0 gap-2 overflow-hidden p-2 lg:gap-0 lg:shrink-0 lg:rounded-lg lg:border lg:border-gray-4 lg:p-0"
        >
          <div
            className={cn(
              "hidden md:block relative w-23 shrink-0 lg:w-42.5 rounded overflow-hidden lg:rounded-none lg:min-h-39.5 animate-pulse",
              getSkeletonColor(index),
            )}
          />
          <div className="flex items-center justify-between flex-1 gap-2 lg:px-8 lg:py-4 lg:flex-col">
            <div className="w-full flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2">
              <div
                className={cn(
                  "w-1/2 h-4 animate-pulse rounded",
                  getSkeletonColor(index),
                )}
              />

              <div className="lg:hidden">
                <div className="flex items-center gap-1.5">
                  <div
                    className={cn(
                      "w-8 h-4 animate-pulse rounded",
                      getSkeletonColor(index),
                    )}
                  ></div>
                  <div
                    className={cn(
                      "w-8 h-4 animate-pulse rounded",
                      getSkeletonColor(index),
                    )}
                  ></div>
                </div>
              </div>

              <div
                className={cn(
                  "hidden lg:block size-6 animate-pulse rounded",
                  getSkeletonColor(index),
                )}
              />
            </div>
            <div className="lg:hidden">
              <div
                className={cn(
                  "w-20 h-8 animate-pulse rounded",
                  getSkeletonColor(index),
                )}
              ></div>
            </div>
            <div
              className={cn(
                "hidden lg:block w-full h-5 animate-pulse rounded",
                getSkeletonColor(index),
              )}
            />

            <div className="hidden lg:flex w-full items-end justify-between gap-2">
              <div className="flex items-center gap-6">
                <div
                  className={cn(
                    "w-20 lg:w-31 h-4 lg:h-6 animate-pulse rounded",
                    getSkeletonColor(index),
                  )}
                />
                <div
                  className={cn(
                    "w-20 h-4 lg:h-6 animate-pulse rounded",
                    getSkeletonColor(index),
                  )}
                ></div>
              </div>

              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    "w-14 h-5 lg:h-7 animate-pulse rounded",
                    getSkeletonColor(index),
                  )}
                />
                <div
                  className={cn(
                    "w-8 lg:w-10 h-5 lg:h-7 animate-pulse rounded",
                    getSkeletonColor(index),
                  )}
                />
              </div>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}

function CartSummarySkeleton() {
  return (
    <aside className="lg:col-span-4 xl:col-span-5 border-t lg:border border-gray-4 pt-3 lg:p-6 lg:rounded-lg">
      <div className="hidden lg:flex items-center justify-between lg:mb-3">
        <div className="w-20 h-6 bg-gray-2 animate-pulse rounded" />
        <div className="size-4 lg:size-6 bg-gray-2 animate-pulse rounded" />
      </div>
      <div className="flex flex-col">
        <div className="flex items-center justify-between pb-3 lg:py-4 border-b lg:border-y border-gray-4">
          <div className="w-24 h-5 bg-gray-2 animate-pulse rounded" />
          <div className="w-20 h-5 bg-gray-2 animate-pulse rounded" />
        </div>
        <div className="flex flex-col gap-y-2 py-3 lg:py-4 border-b border-gray-4">
          <div className="flex items-center justify-between">
            <div className="w-24 h-5 bg-gray-2 animate-pulse rounded" />
            <div className="w-20 h-5 bg-gray-2 animate-pulse rounded" />
          </div>
          <div className="flex items-start gap-2">
            <div className="size-4 lg:size-6 shrink-0 bg-gray-2 animate-pulse rounded" />
            <div className="w-full h-8 bg-gray-2 animate-pulse rounded" />
          </div>
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

export default function CartPageSkeleton() {
  return (
    <div
      className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-6 items-start p-6 border border-gray-4 rounded-lg lg:p-0 lg:rounded-none lg:border-none"
      aria-busy="true"
      aria-label="در حال بارگذاری سبد خرید"
    >
      <CartItemSkeleton />
      <CartSummarySkeleton />
    </div>
  );
}
