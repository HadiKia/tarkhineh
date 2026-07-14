const ProductsTableSkeleton = () => {
  return (
    <div className="overflow-hidden rounded-md bg-background">
      <div className="overflow-x-auto">
        <table className="min-w-full w-max">
          <thead className="bg-gray-2">
            <tr>
              {[40, 100, 90, 100, 90, 50, 50, 80, 80, 60, 60].map(
                (width, index) => (
                  <th key={index} className="px-2 py-3.25" style={{ width }}>
                    <div className="mx-auto h-5 animate-pulse rounded-sm bg-gray-3" />
                  </th>
                ),
              )}
            </tr>
          </thead>

          <tbody>
            {[...Array(10)].map((_, row) => (
              <tr key={row} className="border-t border-gray-3">
                {/* Main Image Url */}
                <td className="px-2 py-2">
                  <div className="size-10 animate-pulse rounded-md bg-gray-2" />
                </td>

                {/* Title */}
                <td className="px-2 py-2.25 text-center">
                  <div className="mx-auto h-6 animate-pulse rounded bg-gray-2" />
                </td>

                {/* Category */}
                <td className="px-2 py-2.25 text-center">
                  <div className="mx-auto h-5.25 animate-pulse rounded bg-gray-2" />
                </td>

                {/* Price */}
                <td className="px-2 py-2.25">
                  <div className="mx-auto h-5.25 animate-pulse rounded bg-gray-2" />
                </td>

                {/* Off Price */}
                <td className="px-2 py-2.25">
                  <div className="mx-auto h-5.25 animate-pulse rounded bg-gray-2" />
                </td>

                {/* Discount */}
                <td className="px-2 py-2.25">
                  <div className="mx-auto h-6.25 animate-pulse rounded bg-gray-2" />
                </td>

                {/* Count In Stock */}
                <td className="px-2 py-2.25">
                  <div className="mx-auto h-5.25 animate-pulse rounded bg-gray-2" />
                </td>

                {/* Created At */}
                <td className="px-2 py-2.25">
                  <div className="mx-auto h-5.25  animate-pulse rounded bg-gray-2" />
                </td>

                {/* Updated At */}
                <td className="px-2 py-2.25">
                  <div className="mx-auto h-5.25  animate-pulse rounded bg-gray-2" />
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
};

export default ProductsTableSkeleton;
