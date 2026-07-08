import * as React from "react";

import { cn } from "@/lib/utils";
import Image from "next/image";

type EmptyStateProps = {
  title: string;
  action?: React.ReactNode;
} & React.ComponentProps<"div">;

const EmptyState = ({
  title,
  action,
  className,
  ...props
}: EmptyStateProps) => {
  return (
    <div
      className={cn(
        "relative py-8 px-15 border border-gray-4 lg:border-none rounded-lg grid place-items-center",
        className,
      )}
      {...props}
    >
      <Image
        src="/images/empty/empty.png"
        alt="pattern"
        width={325}
        height={313}
      />
      <div className="absolute top-1/2 lg:top-2/5 flex flex-col items-center gap-y-4 lg:gap-y-8 px-4 ">
        <p className="text-xs lg:text-xl text-gray-7 text-center">{title}</p>
        {action}
      </div>
    </div>
  );
};

export default EmptyState;
