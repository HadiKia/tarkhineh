import TextFieldSkeleton from "@/components/common/TextFieldSkeleton";

export default function CouponFormSkeleton() {
  return (
    <div className="mx-auto flex max-w-179.5 flex-col gap-4 lg:grid lg:grid-cols-2 lg:gap-6 lg:py-8">
      <TextFieldSkeleton />
      <TextFieldSkeleton />
      <TextFieldSkeleton />
      <TextFieldSkeleton />
      <TextFieldSkeleton />
      <div className="h-10 animate-pulse rounded-sm bg-gray-2 lg:col-span-2 lg:rounded-lg" />
      <div className="flex w-full items-center justify-between gap-4 lg:col-start-2">
        <div className="h-10 flex-1 animate-pulse rounded-lg bg-gray-2" />
        <div className="h-10 flex-1 animate-pulse rounded-lg bg-gray-2" />
      </div>
    </div>
  );
}
