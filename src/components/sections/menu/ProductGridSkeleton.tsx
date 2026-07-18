export default function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {[...Array(8)].map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-lg border border-gray-2 bg-white"
        >
          <div className="aspect-square bg-gray-2 animate-pulse" />

          <div className="p-3">
            <div className="mb-1 h-4 w-3/4 rounded bg-gray-3 animate-pulse" />

            <div className="mb-2 flex items-center gap-1">
              <div className="h-3.5 w-3.5 rounded bg-gray-3 animate-pulse" />
              <div className="h-3 w-12 rounded bg-gray-3 animate-pulse" />
            </div>

            <div className="flex items-center justify-between">
              <div className="h-4 w-10 rounded bg-gray-3 animate-pulse" />
              <div className="flex items-center gap-1.5">
                <div className="h-4 w-16 rounded bg-gray-3 animate-pulse" />
                <div className="h-3 w-8 rounded bg-gray-3 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
