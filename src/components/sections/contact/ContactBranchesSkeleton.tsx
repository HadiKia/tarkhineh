export default function ContactBranchesSkeleton() {
  return (
    <section className="mx-auto w-full max-w-306 px-4 py-6 lg:py-12 xl:px-0">
      <div className="flex flex-col gap-y-7 lg:gap-y-6">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row md:items-stretch overflow-hidden rounded-sm border border-gray-4 bg-white transition-opacity lg:rounded-lg"
          >
            <div className="relative w-full min-h-28 lg:w-150 lg:min-h-70 lg:flex-1 bg-gray-2 animate-pulse" />

            <div className="flex flex-col items-center justify-center w-full gap-1 px-4 pb-4 pt-3 lg:p-6 lg:gap-3 lg:flex-1">
              <div className="h-5 w-1/2 animate-pulse rounded bg-gray-2 lg:h-7 lg:mb-5" />
              <div className="h-4 lg:h-7 w-full animate-pulse rounded bg-gray-2" />
              <div className="h-4 lg:h-7 w-2/3 animate-pulse rounded bg-gray-2" />
              <div className="h-4 lg:h-7 w-2/3 animate-pulse rounded bg-gray-2" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
