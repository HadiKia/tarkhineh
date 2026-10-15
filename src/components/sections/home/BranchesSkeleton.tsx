export default function BranchesSkeleton() {
  return (
    <section className="mx-auto w-full max-w-306 px-4 py-6 lg:py-12 xl:px-0">
      <div className="mx-auto mb-3 h-6 w-40 animate-pulse rounded bg-gray-2 lg:mb-8 lg:h-8" />

      <div className="grid gap-x-4 gap-y-3 md:grid-cols-2 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-8">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="flex items-stretch overflow-hidden rounded-sm border border-gray-4 bg-white lg:flex-col lg:rounded-lg"
          >
            <div className="h-20 w-36 shrink-0 animate-pulse bg-gray-2 lg:h-57.5 lg:w-full" />

            <div className="flex w-full flex-col items-center justify-center gap-1 p-2 lg:gap-3 lg:pb-4">
              <div className="h-5 w-1/2 animate-pulse rounded bg-gray-2 lg:h-6" />
              <div className="h-4 w-full animate-pulse rounded bg-gray-2" />
              <div className="h-4 w-2/3 animate-pulse rounded bg-gray-2" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
