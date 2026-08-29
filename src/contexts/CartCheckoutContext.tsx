"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

export type DeliveryMethod = "courier" | "pickup";

const COURIER_DELIVERY_FEE = 100_000;

type CartCheckoutContextValue = {
  deliveryMethod: DeliveryMethod;
  selectedAddressId: string | null;
  courierDeliveryFee: number;
  setDeliveryMethod: (method: DeliveryMethod) => void;
  setSelectedAddressId: Dispatch<SetStateAction<string | null>>;
};

const CartCheckoutContext = createContext<CartCheckoutContextValue | null>(
  null,
);

export default function CartCheckoutProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [deliveryMethod, setDeliveryMethod] =
    useState<DeliveryMethod>("courier");
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    null,
  );

  const value = useMemo(
    () => ({
      deliveryMethod,
      selectedAddressId,
      courierDeliveryFee: COURIER_DELIVERY_FEE,
      setDeliveryMethod,
      setSelectedAddressId,
    }),
    [deliveryMethod, selectedAddressId],
  );

  return (
    <CartCheckoutContext.Provider value={value}>
      {children}
    </CartCheckoutContext.Provider>
  );
}

export function useCartCheckout() {
  const context = useContext(CartCheckoutContext);

  if (!context) {
    throw new Error("useCartCheckout must be used within a CartCheckoutProvider");
  }

  return context;
}
