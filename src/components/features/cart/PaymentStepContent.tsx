import CartDiscountCode from "./CartDiscountCode";
import CartPaymentMethod from "./CartPaymentMethod";

export default function PaymentStepContent() {
  return (
    <section className="lg:col-span-8 xl:col-span-7 flex flex-col gap-3 lg:gap-6">
      <CartDiscountCode />
      <CartPaymentMethod />
    </section>
  );
}
