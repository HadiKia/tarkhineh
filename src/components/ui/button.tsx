import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center border border-transparent text-xs lg:text-base font-medium whitespace-nowrap transition-all duration-300 ease-linear outline-none select-none focus-visible:border-ring visible:ring-0 focus-visible:ring-ring/50 disabled:pointer-events-none aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 lg:[&_svg:not([class*='size-'])]:size-6 cursor-pointer gap-1 lg:gap-2 p-[7px] rounded-sm lg:rounded-lg",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-shade-2 active:bg-shade-3 disabled:bg-gray-2 disabled:text-gray-4",
        outline:
          "border-primary text-primary bg-white hover:text-shade-2 hover:border-shade-2 active:border-shade-3 active:text-shade-3 aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-tint-2 active:bg-tint-3 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ghost:
          "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
        destructive:
          "bg-error-extraLight text-destructive hover:bg-error-light/20 focus-visible:border-error focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
        link: "text-primary ",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Button({
  type = "button",
  className,
  variant = "default",
  asChild = false,
  isLoading = false,
  disabled,
  children,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    isLoading?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      type={asChild ? undefined : type}
      data-slot="button"
      data-variant={variant}
      className={cn(buttonVariants({ variant, className }))}
      disabled={!asChild ? disabled || isLoading : undefined}
      aria-busy={isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="animate-spin animation-duration-[1.5s]" />
      ) : (
        children
      )}
    </Comp>
  );
}

export { Button, buttonVariants };
