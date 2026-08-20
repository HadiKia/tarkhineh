"use client";

import { useState } from "react";
import { ArrowDown2, HomeHashtag } from "iconsax-reactjs";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useBranchContext } from "@/contexts/BranchContext";

type BranchSelectorProps = {
  isMobile?: boolean;
  onSelect?: () => void;
};

const BranchSelector = ({
  isMobile = false,
  onSelect,
}: BranchSelectorProps) => {
  const { branches, selectedBranch, selectBranch, isLoading } =
    useBranchContext();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const title = selectedBranch?.title ?? "شعبه‌ها";

  const handleSelect = (branchId: string) => {
    selectBranch(branchId);
    onSelect?.();
    setIsDropdownOpen(false);
  };

  if (isMobile) {
    return (
      <Accordion type="single" collapsible className="border-0! rounded-none!">
        <AccordionItem value="branches">
          <AccordionTrigger className="flex items-center gap-1 text-xs p-0 transition-all duration-200 ease-linear mb-2">
            <span className="flex items-center gap-1">
              <HomeHashtag className="size-3 text-gray-7" />
              {title}
            </span>
          </AccordionTrigger>
          <AccordionContent className="px-0! pb-0!">
            <div className="flex flex-col gap-2 mb-2 ps-5">
              {branches.length > 0 ? (
                branches.map((branch) => {
                  const isSelected = selectedBranch?._id === branch._id;

                  return (
                    <button
                      key={branch._id}
                      type="button"
                      onClick={() => handleSelect(branch._id)}
                      className={cn(
                        "w-full cursor-pointer text-start text-xs transition-colors",
                        isSelected
                          ? "text-primary font-medium"
                          : "text-gray-7",
                      )}
                    >
                      {branch.title}
                    </button>
                  );
                })
              ) : (
                <span className="text-xs text-gray-7">
                  شعبه‌ای ثبت نشده است.
                </span>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  }

  return (
    <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label="انتخاب شعبه"
          className={cn(
            "flex items-center gap-2 transition-all duration-200 ease-linear lg:text-xl lg:border-b lg:border-transparent lg:pb-1 lg:-mb-1 cursor-pointer outline-none",
            "text-gray-7 hover:text-gray-8",
          )}
        >
          {title}
          <ArrowDown2
            className={cn(
              "size-4 transition-transform duration-200 lg:size-4",
              isDropdownOpen && "rotate-180",
            )}
          />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        {branches.length > 0 ? (
          branches.map((branch) => {
            const isSelected = selectedBranch?._id === branch._id;

            return (
              <DropdownMenuItem
                key={branch._id}
                onClick={() => handleSelect(branch._id)}
                className={cn(
                  isSelected ? "font-semibold text-primary!" : "text-gray-8",
                  "group/item",
                )}
              >
                {branch.title}
              </DropdownMenuItem>
            );
          })
        ) : (
          <DropdownMenuItem disabled>شعبه‌ای ثبت نشده است.</DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default BranchSelector;
