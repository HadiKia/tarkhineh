import { cn } from "@/lib/utils";
import Image from "next/image";

type SearchNotFoundProps = {
  title: string;
} & React.ComponentProps<"div">;

const SearchNotFound = ({
  title,
  className,
  ...props
}: SearchNotFoundProps) => {
  return (
    <div
      className={cn(
        "relative pt-5 pb-12 lg:pb-20 px-15 grid place-items-center gap-4 lg:gap-8",
        className,
      )}
      {...props}
    >
      <p className="text-base lg:text-xl text-gray-8 text-center">{title}</p>
      <Image
        src="/images/empty/match-not-found.png"
        alt="No search results"
        aria-hidden
        width={325}
        height={313}
      />
    </div>
  );
};

export default SearchNotFound;
