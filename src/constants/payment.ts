import type { PaymentGateway } from "@/contexts/CartCheckoutContext";

export const paymentGatewayLabels: Record<PaymentGateway, string> = {
  saman: "بانک سامان",
  mellat: "بانک ملت",
  parsian: "بانک پارسیان",
};
