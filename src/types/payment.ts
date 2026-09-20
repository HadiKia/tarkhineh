import type { ID, ISODateString } from "./api";
import type { Address } from "./address";
import type { Branch } from "./branch";
import type { CartDetail } from "./user";
import type {
  DeliveryMethod,
  PaymentGateway,
  PaymentMethod,
} from "@/contexts/CartCheckoutContext";

export type CreatePaymentPayload = {
  deliveryMethod: DeliveryMethod;
  addressId?: ID | null;
  branchId: ID;
  note?: string;
  paymentMethod: PaymentMethod;
  paymentGateway?: PaymentGateway | null;
};

export type PaymentResult = {
  _id: ID;
  invoiceNumber?: string;
  amount: number;
  paymentMethod: PaymentMethod;
  paymentGateway?: PaymentGateway;
  description?: string;
  paymentDate?: string;
  status: "UNCOMPLETED" | "COMPLETED";
  isPaid: boolean;
  createdAt: ISODateString;
  cart?: CartDetail;
  checkout?: {
    deliveryMethod: DeliveryMethod;
    shippingCost: number;
    note: string;
    address?: Address | null;
    branch?: Branch | null;
    paymentGateway?: PaymentGateway | null;
  };
};

export type CreatePaymentResult = {
  message: string;
  payment: Pick<PaymentResult, "_id" | "invoiceNumber" | "amount" | "status" | "isPaid">;
};

export type GetPaymentResult = {
  payment: PaymentResult;
};
