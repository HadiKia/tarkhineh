const ProductsTableSkeleton = () => {
  return (
    <div className="overflow-hidden rounded-lg bg-background">
      <div className="overflow-x-auto">
        <table className="min-w-full w-max">
          <thead className="bg-gray-2">
            <tr>
              {Array.from({ length: 10 }).map((_, i) => (
                <th key={i} className="p-2">
                  <div className="h-4 w-16 animate-pulse rounded bg-gray-3" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }).map((_, rowIndex) => (
              <tr key={rowIndex} className="border-t border-gray-3">
                {Array.from({ length: 10 }).map((_, colIndex) => (
                  <td key={colIndex} className="p-2 text-center">
                    <div className="mx-auto h-4 w-12 animate-pulse rounded bg-gray-3" />
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

export default ProductsTableSkeleton;
