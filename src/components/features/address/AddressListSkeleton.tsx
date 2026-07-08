export default function AddressListSkeleton() {
  return (
    <div className="grid gap-3 lg:grid-cols-2 lg:gap-4">
      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className="h-22.5 lg:h-26.5 rounded-sm lg:rounded-lg bg-gray-2 animate-pulse"
        />
      ))}
    </div>
  );
}
