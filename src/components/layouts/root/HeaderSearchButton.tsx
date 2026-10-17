"use client";

import { useState } from "react";
import { SearchNormal1 } from "iconsax-reactjs";

import SearchRouteSection from "@/components/sections/search/SearchRouteSection";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function HeaderSearchButton() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <Button
        variant="secondary"
        aria-label="جستجو"
        className="hidden lg:flex p-1 lg:p-1.75"
        onClick={() => setIsSearchOpen(true)}
      >
        <SearchNormal1 className="w-4 h-4 lg:w-6 lg:h-6" />
      </Button>

      <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <DialogContent className="hidden lg:block lg:min-w-150">
          <DialogHeader>
            <DialogTitle>جستجو</DialogTitle>
          </DialogHeader>
          <div className="px-24 py-12 flex flex-col gap-y-4">
            <p className="text-center text-gray-8 text-base">
              لطفا متن خود را تایپ و سپس دکمه Enter را بزنید.
            </p>

            <SearchRouteSection onNavigate={() => setIsSearchOpen(false)} />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
