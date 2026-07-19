export default function CategoryFilterSkeleton() {
  return (
    <div className="flex flex-col gap-y-2 lg:gap-y-4">
      <div className="bg-gray-2">
        <div className="mx-auto max-w-306 flex items-center gap-x-4 overflow-x-auto scrollbar-none px-4 xl:px-0 lg:gap-x-8">
          <div className="flex items-center gap-x-4 py-2.5 lg:py-4">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="w-20 h-5 lg:h-8 rounded-sm lg:rounded-lg bg-gray-3 animate-pulse "
              />
            ))}
          </div>
        </div>
      </div>

      <div className="h-6 lg:h-8">
        <div className="mx-auto max-w-306 flex items-center gap-x-2 overflow-x-auto scrollbar-none px-4 xl:px-0">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="w-20 lg:w-25 h-6 lg:h-8 rounded-lg lg:rounded-full bg-gray-2 animate-pulse "
            />
          ))}
        </div>
      </div>
    </div>
  );
}
