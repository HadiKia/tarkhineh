"use client";

import { usePathname } from "next/navigation";
import CartButton from "@/components/features/cart/CartButton";

export default function CartHeaderButton() {
  const pathname = usePathname();
  const isCartRoute = pathname === "/cart" || pathname.startsWith("/cart/");

  return <CartButton variant={isCartRoute ? "default" : "secondary"} />;
}
