import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-16 w-full rounded-sm lg:rounded-lg border border-input hover:border-primary bg-transparent px-4 py-1.75  text-xs lg:text-base transition-all duration-300 ease-linear outline-none placeholder:text-gray-6 focus-visible:border-ring focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive md:text-sm dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 resize-none text-gray-8",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
