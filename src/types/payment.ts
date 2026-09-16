import type { ID, ISODateString } from "./api";
import type {
  DeliveryMethod,
  PaymentGateway,
  PaymentMethod,
} from "@/contexts/CartCheckoutContext";

export type CreatePaymentPayload = {
  deliveryMethod: DeliveryMethod;
  addressId?: ID | null;
  branchId?: ID | null;
  note?: string;
  paymentMethod: PaymentMethod;
  paymentGateway?: PaymentGateway | null;
};

export type PaymentResult = {
  _id: ID;
  invoiceNumber?: string;
  amount: number;
  status: "UNCOMPLETED" | "COMPLETED";
  isPaid: boolean;
  createdAt: ISODateString;
  checkout?: {
    deliveryMethod: DeliveryMethod;
    shippingCost: number;
    note: string;
  };
};

export type CreatePaymentResult = {
  message: string;
  payment: Pick<PaymentResult, "_id" | "invoiceNumber" | "amount" | "status" | "isPaid">;
};

export type GetPaymentResult = {
  payment: PaymentResult;
};
