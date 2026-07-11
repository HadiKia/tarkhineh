export default function CategoriesTableSkeleton() {
  return (
    <div className="overflow-hidden rounded-md bg-background">
      <div className="overflow-x-auto">
        <table className="min-w-full w-max">
          <thead className="bg-gray-2">
            <tr>
              {[157, 121, 104, 184, 80, 80, 60, 60].map((width, index) => (
                <th key={index} className="p-2" style={{ width }}>
                  {index === 0 ? (
                    <div className="flex items-center gap-1">
                      <div className="size-7.5 " />
                      <div className="h-4 flex-1 animate-pulse rounded-sm bg-gray-3" />
                    </div>
                  ) : (
                    <div className="mx-auto h-4 animate-pulse rounded-sm bg-gray-3" />
                  )}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {[...Array(4)].map((_, row) => (
              <tr key={row} className="border-t border-gray-3">
                {/* Title */}
                <td className="px-2 py-2.25">
                  <div className="flex items-center gap-1">
                    <div className="size-7.5 animate-pulse rounded-md bg-gray-2" />
                    <div className="h-5 min-w-0 flex-1 animate-pulse rounded-md bg-gray-2" />
                  </div>
                </td>

                {/* English Title */}
                <td className="px-2 py-2.25 text-center">
                  <div className="mx-auto h-4 animate-pulse rounded bg-gray-2" />
                </td>

                {/* Type */}
                <td className="px-2 py-2.25 text-center">
                  <div className="mx-auto h-6.25 animate-pulse rounded-lg bg-gray-2" />
                </td>

                {/* Description */}
                <td className="px-2 py-2.25">
                  <div className="mx-auto h-4 animate-pulse rounded-md bg-gray-2" />
                </td>

                {/* Created At */}
                <td className="px-2 py-2.25">
                  <div className="mx-auto h-5.25  animate-pulse rounded-md bg-gray-2" />
                </td>

                {/* Updated At */}
                <td className="px-2 py-2.25">
                  <div className="mx-auto h-5.25  animate-pulse rounded-md bg-gray-2" />
                </td>

                {/* Edit */}
                <td className="px-2 py-2.25">
                  <div className="mx-auto size-7.5 animate-pulse rounded-md bg-gray-2" />
                </td>

                {/* Delete */}
                <td className="px-2 py-2.25">
                  <div className="mx-auto size-7.5 animate-pulse rounded-md bg-gray-2" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
