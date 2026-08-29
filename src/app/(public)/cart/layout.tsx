import CartMobileHeader from "@/components/features/cart/CartMobileHeader";
import CartSteps from "@/components/features/cart/CartSteps";
import CartCheckoutProvider from "@/contexts/CartCheckoutContext";

export default function CartLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <CartCheckoutProvider>
      <main className="mx-auto w-full max-w-306 px-4 py-6 xl:px-0 lg:py-10">
        <CartMobileHeader />
        <CartSteps />
        {children}
      </main>
    </CartCheckoutProvider>
  );
}
