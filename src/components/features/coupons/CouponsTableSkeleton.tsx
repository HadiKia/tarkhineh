export default function CouponsTableSkeleton() {
  return (
    <div className="overflow-hidden rounded-md bg-background">
      <div className="overflow-x-auto">
        <table className="min-w-full w-max">
          <thead className="bg-gray-2">
            <tr>
              {[100, 90, 90, 110, 150, 100, 60, 60].map((width, index) => (
                <th key={`${width}-${index}`} className="p-2 py-3.25" style={{ width }}>
                  <div className="mx-auto h-5 animate-pulse rounded-sm bg-gray-3" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...Array(6)].map((_, row) => (
              <tr key={row} className="border-t border-gray-3">
                {[...Array(8)].map((__, column) => (
                  <td key={column} className="px-2 py-2.25">
                    <div className="mx-auto h-5 animate-pulse rounded bg-gray-2" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
