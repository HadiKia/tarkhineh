const UsersTableSkeleton = () => {
  return (
    <div className="overflow-hidden rounded-md bg-background">
      <div className="overflow-x-auto">
        <table className="min-w-full w-max">
          <thead className="bg-gray-2">
            <tr>
              {[40, 120, 80, 140, 70, 80, 80, 60].map((width, index) => (
                <th key={index} className="px-2 py-3.25" style={{ width }}>
                  <div className="mx-auto h-5 animate-pulse rounded-sm bg-gray-3" />
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {[...Array(9)].map((_, row) => (
              <tr key={row} className="border-t border-gray-3">
                {/* Avatar */}
                <td className="px-2 py-2">
                  <div className="size-10 animate-pulse rounded-full bg-gray-2 mx-auto" />
                </td>

                {[...Array(7)].map((_, cell) => (
                  <td key={cell} className="px-2 py-2.25">
                    <div className="mx-auto h-5.25 animate-pulse rounded bg-gray-2" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersTableSkeleton;
