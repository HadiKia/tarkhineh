export default function SidebarSkeleton() {
  return (
    <div className="lg:px-2 lg:py-4 lg:border lg:border-gray-4 lg:rounded-lg animate-pulse">
      <div className="flex items-center gap-4 border-b border-gray-6 pb-3 mb-3">
        <div className="border border-gray-4 w-12 h-12 lg:w-22 lg:h-22 rounded-full bg-gray-2" />

        <div className="flex-1 space-y-2">
          <div className="h-5 lg:h-6 w-28 rounded-sm lg:rounded-lg bg-gray-2" />

          <div className="h-4 lg:h-5 w-20 rounded-sm lg:rounded-lg bg-gray-2" />
        </div>
      </div>

      <div className="space-y-2">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="h-8 rounded-sm lg:rounded-lg bg-gray-2" />
        ))}
      </div>
    </div>
  );
}
