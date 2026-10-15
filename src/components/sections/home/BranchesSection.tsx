"use client";

import Image from "next/image";

import { useGetBranches } from "@/hooks/useBranches";
import BranchesSkeleton from "./BranchesSkeleton";

export default function BranchesSection() {
  const { data, isFetching } = useGetBranches();

  if (isFetching) {
    return <BranchesSkeleton />;
  }

  const branches = data?.branches ?? [];

  if (branches.length === 0) {
    return null;
  }

  return (
    <section className="mx-auto w-full max-w-306 px-4 py-6 lg:py-12 xl:px-0">
      <h2 className="mb-3 text-center text-base font-bold text-gray-8 lg:mb-8 lg:text-2xl">
        ترخینه گردی
      </h2>

      <div className="grid gap-x-4 gap-y-3 md:grid-cols-2 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-8">
        {branches.map((branch) => (
          <article
            key={branch._id}
            className="flex items-stretch lg:flex-col overflow-hidden rounded-sm border border-gray-4 bg-white transition-opacity lg:rounded-lg"
          >
            <div className="relative w-36 shrink-0 lg:w-full h-20 lg:h-57.5">
              <Image
                src={branch.imageUrl ?? "/images/empty/placeholder.png"}
                alt={branch.title}
                fill
                sizes="(min-width: 1024px) 25vw, 144px"
                className="object-cover object-center"
              />
            </div>

            <div className="flex flex-col items-center justify-center w-full gap-1 p-2 lg:pb-4 lg:gap-3">
              <h3 className="text-center text-sm font-medium lg:font-bold text-gray-8 lg:text-xl">
                {branch.title}
              </h3>

              <p className="text-center text-xs text-gray-7 lg:text-sm lg:font-medium">
                {branch.address}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
