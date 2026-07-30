import { ArrowLeft2 } from "iconsax-reactjs";
import Link from "next/link";

type Breadcrumb = {
  label: string;
  href?: string;
};

type BreadcrumbsProps = {
  breadcrumbs: Breadcrumb[];
};

export default function Breadcrumbs({ breadcrumbs }: BreadcrumbsProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="border-b border-gray-3 py-4 lg:py-6 mb-4 lg:mb-6"
    >
      <ol className="flex flex-wrap items-center gap-1 lg:gap-2">
        {breadcrumbs.map((breadcrumb, index) => {
          const isLast = index === breadcrumbs.length - 1;

          return (
            <li
              key={breadcrumb.href ?? breadcrumb.label}
              aria-current={isLast ? "page" : undefined}
              className={`flex items-center gap-x-1 text-xs lg:text-base ${
                isLast ? "font-medium text-gray-8" : "text-gray-7"
              }`}
            >
              {breadcrumb.href ? (
                <Link href={breadcrumb.href}>{breadcrumb.label}</Link>
              ) : (
                <span>{breadcrumb.label}</span>
              )}

              {!isLast && (
                <ArrowLeft2 className="size-4 text-gray-7 lg:size-5" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
