"use client";

import Image from "next/image";

import { useGetBranches } from "@/hooks/useBranches";
import ContactBranchesSkeleton from "./ContactBranchesSkeleton";

export default function ContactBranchesSection() {
  const { data, isFetching } = useGetBranches();

  if (isFetching) {
    return <ContactBranchesSkeleton />;
  }

  const branches = data?.branches ?? [];

  if (branches.length === 0) {
    return null;
  }

  return (
    <section className="mx-auto w-full max-w-306 px-4 py-6 lg:py-12 xl:px-0">
      <div className="flex flex-col gap-y-7 lg:gap-y-6">
        {branches.map((branch) => (
          <article
            key={branch._id}
            className="flex flex-col md:flex-row md:items-stretch overflow-hidden rounded-sm border border-gray-4 bg-white transition-opacity lg:rounded-lg"
          >
            <div className="relative w-full min-h-28 lg:w-150 lg:min-h-70 lg:flex-1">
              <Image
                src={branch.imageUrl ?? "/images/empty/placeholder.png"}
                alt={branch.title}
                fill
                sizes="(min-width: 1024px) 25vw, 144px"
                className="object-cover "
              />
            </div>

            <div className="flex flex-col items-center justify-center w-full gap-1 px-4 pb-4 pt-3 lg:p-6 lg:gap-3 lg:flex-1">
              <h3 className="text-center text-sm font-medium lg:font-bold text-gray-8 lg:text-xl lg:mb-5">
                {branch.title}
              </h3>

              <p className="text-center text-xs text-gray-7 lg:text-lg lg:font-medium">
                {branch.address}
              </p>

              <div className="flex items-center gap-1 text-center text-xs text-gray-7 lg:text-lg lg:font-medium">
                <span>شماره تماس:</span>
                <span>{branch.phoneNumber1}</span>
              </div>

              {branch.phoneNumber2 && (
                <div className="flex items-center gap-1 text-center text-xs text-gray-7 lg:text-lg lg:font-medium">
                  <span>شماره تماس:</span>
                  <span>{branch.phoneNumber2}</span>
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
