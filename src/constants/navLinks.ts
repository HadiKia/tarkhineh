import {
  Home,
  Profile2User,
  MenuBoard,
  CallCalling,
  Bank,
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
    label: "اعطای نمایندگی",
    href: "/franchise",
    icon: Bank,
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
