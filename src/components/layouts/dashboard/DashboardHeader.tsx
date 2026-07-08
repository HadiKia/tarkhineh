import { ArrowRight2 } from "iconsax-reactjs";
import Link from "next/link";

type DashboardHeaderProps = {
  title: string;
  backHref?: string;
};

const DashboardHeader = ({ title, backHref = "/panel" }: DashboardHeaderProps) => {
  return (
    <div className="flex items-center  mb-6 lg:mb-4 lg:pb-2 lg:border-b lg:border-gray-4 text-gray-8">
      <Link href={backHref} className="lg:hidden">
        <ArrowRight2 className="size-4" />
      </Link>
      <h2 className="flex-1 text-center lg:text-start text-base font-bold lg:text-xl">
        {title}
      </h2>

      <div className="size-4 lg:hidden" />
    </div>
  );
};

export default DashboardHeader;
