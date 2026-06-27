"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS, NavLink } from "@/constants/navLinks";
import { cn } from "@/lib/utils";

interface NavLinksProps {
  showIcons?: boolean;
  className?: string;
  itemClassName?: string;
  onLinkClick?: () => void;
}

export default function NavLinks({
  showIcons = false,
  className,
  itemClassName,
  onLinkClick,
}: NavLinksProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <ul className={cn("flex", className)}>
      {NAV_LINKS.map((link: NavLink) => {
        const active = isActive(link.href);
        const Icon = link.icon;

        return (
          <li key={link.href} className={cn(itemClassName)}>
            <Link
              href={link.href}
              onClick={onLinkClick}
              className={cn(
                "flex items-center gap-1 text-xs transition-all duration-200 ease-linear mb-2 lg:text-xl lg:border-b lg:border-transparent lg:pb-1 lg:-mb-1",
                "hover:text-primary",
                active
                  ? "text-primary text-sm font-medium lg:font-bold lg:border-primary"
                  : "text-gray-7 hover:text-gray-8",
              )}
            >
              {showIcons && Icon && (
                <Icon
                  className={cn(
                    "shrink-0 text-gray-7",
                    active ? "w-4 h-4" : "w-3 h-3 ",
                  )}
                />
              )}
              {link.label}
              {active && <span className="sr-only">(صفحه فعلی)</span>}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
