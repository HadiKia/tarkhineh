import type { ComponentType, SVGProps } from "react";
import type { UserRole } from "@/types";
import { Heart, Location, Setting2, User, Wallet2 } from "iconsax-reactjs";

type IconVariant = "Bold" | "Broken" | "Bulk" | "Outline" | "TwoTone";

export type SidebarLinkItem = {
  id: number;
  children: string;
  path: string;
  Icon: ComponentType<SVGProps<SVGSVGElement> & { variant?: IconVariant }>;
};

const BASE_LINKS: SidebarLinkItem[] = [
  { id: 1, children: "پروفایل", path: "/profile", Icon: User },
  { id: 2, children: "پیگیری سفارشات", path: "/profile/order-tracking", Icon: Wallet2 },
  { id: 3, children: "علاقمندی‌ها", path: "/profile/favorites", Icon: Heart },
  { id: 4, children: "آدرس‌های من", path: "/profile/addresses", Icon: Location },
];

export const sidebarConfig: Record<UserRole, SidebarLinkItem[]> = {
  USER: BASE_LINKS,
  ADMIN: [
    ...BASE_LINKS,
    { id: 5, children: "پنل مدیریت", path: "/admin", Icon: Setting2 },
    { id: 6, children: "دسته‌بندی ها", path: "/admin/categories", Icon: Setting2 },
  ],
};