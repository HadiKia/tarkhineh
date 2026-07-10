import { cn } from "@/lib/utils";

export default function CategoriesTableSkeleton() {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-2 bg-background">
      <table className="w-full border-collapse">
        <thead className="bg-gray-1">
          <tr>
            {Array.from({ length: 8 }).map((_, i) => (
              <th key={i} className="p-3">
                <div className="mx-auto h-4 w-20 animate-pulse rounded bg-gray-3" />
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {Array.from({ length: 4 }).map((_, row) => (
            <tr
              key={row}
              className={cn(
                "border-t",
                row % 2 === 0
                  ? "bg-background border-gray-2"
                  : "bg-gray-0 border-gray-1",
              )}
            >
              {Array.from({ length: 8 }).map((_, cell) => (
                <td key={cell} className="p-3">
                  <div className="mx-auto h-4 w-16 animate-pulse rounded bg-gray-2" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
