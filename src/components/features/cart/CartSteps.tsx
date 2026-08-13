"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { cartSteps, isCartStepPath } from "@/constants/cartSteps";
import useCartStatus from "@/hooks/useCartStatus";

export default function CartSteps() {
  const pathname = usePathname();
  const { isGuest, hasCartItems } = useCartStatus();

  const currentIndex = cartSteps.findIndex((step, index) =>
    isCartStepPath(pathname, step.href, index),
  );
  const activeIndex = currentIndex < 0 ? 0 : currentIndex;

  return (
    <nav aria-label="مراحل سبد خرید">
      <div className="hidden items-center lg:flex max-w-182.5 mx-auto mb-10">
        {cartSteps.map((step, index) => {
          const stepClassName = cn(
            "flex items-center gap-1 whitespace-nowrap text-sm text-gray-4",
            isGuest && index > 0 && "cursor-default",
            index === 0 && "pe-2 py-1",
            index > 0 && index < cartSteps.length - 1 && "px-2 py-1",
            index === cartSteps.length - 1 && "ps-2 py-1",
            index <= activeIndex && "text-primary",
            index === activeIndex && "text-base font-bold",
          );
          const stepIconClassName = cn(
            "size-6",
            index === activeIndex && "size-8",
          );

          return (
            <div
              key={step.href}
              className="flex flex-1 items-center last:flex-none"
            >
              {isGuest && index > 0 ? (
                <span aria-disabled="true" className={stepClassName}>
                  <step.icon className={stepIconClassName} />
                  {step.label}
                </span>
              ) : (
                <Link href={step.href} className={stepClassName}>
                  <step.icon className={stepIconClassName} />
                  {step.label}
                </Link>
              )}
              {index < cartSteps.length - 1 && (
                <span
                  aria-hidden="true"
                  className={cn(
                    "relative h-px flex-1 border-t-2 border-dashed border-gray-4",
                    index < activeIndex && "border-primary",
                  )}
                >
                  {index === 0 && activeIndex === 0 && hasCartItems && (
                    <span className="absolute inset-s-0 -top-0.5 w-1/2 border-t-2 border-dashed border-primary" />
                  )}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
}
