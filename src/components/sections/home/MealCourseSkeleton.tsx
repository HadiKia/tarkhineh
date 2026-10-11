export default function MealCourseSkeleton() {
  return (
    <section className="mx-auto w-full max-w-306 px-4 py-6 lg:py-12 xl:px-0">
      <div className="mx-auto mb-3 h-6 w-40 animate-pulse rounded bg-gray-2 lg:mb-8 lg:h-8" />

      <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-8">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="relative flex flex-col items-center gap-2.5 lg:gap-4"
          >
            <div className="z-1 size-30 animate-pulse rounded-full bg-gray-3 lg:size-60" />

            <div className="absolute bottom-5.5 h-20 w-full rounded bg-gray-2 animate-pulse lg:bottom-6 lg:h-40 lg:rounded-lg" />

            <div className="z-1 h-9 w-3/5 animate-pulse rounded-md bg-gray-3 lg:h-10" />
          </div>
        ))}
      </div>
    </section>
  );
}
