import type { ID, ISODateString } from "./api";
import type { Address } from "./address";
import type { Branch } from "./branch";
import type { CartDetail } from "./user";
import type {
  DeliveryMethod,
  PaymentGateway,
  PaymentMethod,
} from "@/contexts/CartCheckoutContext";

export type OrderStatus =
  | "PREPARING"
  | "OUT_FOR_DELIVERY"
  | "READY_FOR_PICKUP"
  | "DELIVERED";

export type AdminPaymentUser = {
  _id: ID;
  name?: string;
  email?: string;
  phoneNumber?: string;
};

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
  refId?: string;
  paymentDate?: ISODateString;
  status: "UNCOMPLETED" | "COMPLETED";
  orderStatus?: OrderStatus;
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
  payment: Pick<
    PaymentResult,
    "_id" | "invoiceNumber" | "amount" | "status" | "orderStatus" | "isPaid"
  >;
};

export type GetPaymentResult = {
  payment: PaymentResult;
};

export type AdminPaymentResult = PaymentResult & {
  user?: AdminPaymentUser;
};

export type AdminPaymentListResult = {
  payments: AdminPaymentResult[];
};

export type GetAdminPaymentResult = {
  payment: AdminPaymentResult;
};

export type UpdateOrderStatusPayload = {
  orderStatus: OrderStatus;
};

export type UpdateOrderStatusResult = {
  message: string;
  payment: Pick<PaymentResult, "_id" | "orderStatus">;
};
