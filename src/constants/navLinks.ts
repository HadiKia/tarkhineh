import {
  Home,
  Profile2User,
  MenuBoard,
  CallCalling,
} from "iconsax-reactjs";
import { ElementType } from "react";

export interface NavLink {
  label: string;
  href: string;
  icon?: ElementType;
}

export const NAV_LINKS: NavLink[] = [
  {
    label: "صفحه اصلی",
    href: "/",
    icon: Home,
  },
  {
    label: "منو",
    href: "/menu",
    icon: MenuBoard,
  },
  {
    label: "درباره ما",
    href: "/about",
    icon: Profile2User,
  },
  {
    label: "تماس با ما",
    href: "/contact",
    icon: CallCalling,
  },
];
