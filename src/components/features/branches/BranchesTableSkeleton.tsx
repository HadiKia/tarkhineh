const BranchesTableSkeleton = () => {
  return (
    <div className="overflow-hidden rounded-md bg-background">
      <div className="overflow-x-auto">
        <table className="min-w-full w-max">
          <thead className="bg-gray-2">
            <tr>
              {[100, 120, 120, 200, 100, 60, 60].map((width, index) => (
                <th key={index} className="px-2 py-3.25" style={{ width }}>
                  <div className="mx-auto h-5 animate-pulse rounded-sm bg-gray-3" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...Array(6)].map((_, row) => (
              <tr key={row} className="border-t border-gray-3">
                {[120, 120, 120, 220, 140].map((width, index) => (
                  <td key={index} className="px-2 py-2.25" style={{ width }}>
                    <div className="mx-auto h-5 animate-pulse rounded-md bg-gray-2" />
                  </td>
                ))}
                {[0, 1].map((index) => (
                  <td key={index} className="px-2 py-2.25">
                    <div className="mx-auto size-7.5 animate-pulse rounded-md bg-gray-2" />
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

export default BranchesTableSkeleton;
