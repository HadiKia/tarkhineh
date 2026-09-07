import type { ElementType, ReactNode } from "react";

import { cn } from "@/lib/utils";

type CartSectionTitleVariant = "inline" | "stacked";

type CartSectionTitleProps = {
  icon: ElementType;
  children: ReactNode;
  variant?: CartSectionTitleVariant;
  className?: string;
};

const variantClasses: Record<CartSectionTitleVariant, string> = {
  inline:
    "mb-2 lg:border-none lg:pb-0 lg:mb-0",
  stacked: "mb-4 lg:mb-3",
};

export default function CartSectionTitle({
  icon: Icon,
  children,
  variant = "inline",
  className,
}: CartSectionTitleProps) {
  return (
    <h3
      className={cn(
        "flex items-center gap-1 lg:gap-2 pb-2 border-b border-gray-4 text-sm lg:text-base text-gray-8",
        variantClasses[variant],
        className,
      )}
    >
      <Icon className="size-4 lg:size-6" />
      {children}
    </h3>
  );
}
