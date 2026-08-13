import { ShoppingCart, TickSquare, Wallet2, type Icon } from "iconsax-reactjs";

export type CartStep = {
  label: string;
  href: string;
  icon: Icon;
};

export const cartSteps = [
  { label: "سبد خرید", href: "/cart", icon: ShoppingCart },
  { label: "تکمیل اطلاعات", href: "/cart/completion-of-information", icon: TickSquare },
  { label: "پرداخت", href: "/cart/payment", icon: Wallet2 },
] satisfies CartStep[];

export function isCartStepPath(pathname: string, href: string, index: number) {
  return pathname === href || (index > 0 && pathname.startsWith(`${href}/`));
}
