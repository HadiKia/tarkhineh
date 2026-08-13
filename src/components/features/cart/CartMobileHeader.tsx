"use client";

import { ArrowRight2, Trash } from "iconsax-reactjs";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import useCartStatus from "@/hooks/useCartStatus";
import { cartSteps } from "@/constants/cartSteps";
import ClearCartModal from "./ClearCartModal";
import { useState } from "react";
import useMoveBack from "@/hooks/useMoveBack";

export default function CartMobileHeader() {
  const pathname = usePathname();
  const { hasCartItems } = useCartStatus();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isCartPage = pathname === "/cart";
  const hasCart = hasCartItems;
  const activeStep = cartSteps.find((step) => pathname === step.href);
  const moveBack = useMoveBack();

  return (
    <>
      <div className="mb-6 flex items-center text-gray-8 lg:hidden">
        <Button onClick={moveBack} variant="ghost" className="px-0">
          <ArrowRight2 className="size-4" />
        </Button>
        <h1 className="flex-1 text-center text-base font-bold">
          {activeStep?.label ?? "سبد خرید"}
        </h1>
        {isCartPage ? (
          <Button
            variant="ghost"
            className="size-4 px-0"
            disabled={!hasCart}
            onClick={() => setIsModalOpen(true)}
            aria-label="خالی کردن سبد خرید"
          >
            <Trash className="size-4" />
          </Button>
        ) : (
          <div className="size-4" />
        )}
      </div>
      <ClearCartModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
