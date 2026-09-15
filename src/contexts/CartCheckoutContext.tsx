"use client";

import {
  createContext,
  useEffect,
  useContext,
  useMemo,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

export type DeliveryMethod = "courier" | "pickup";

export type PaymentMethod = "online" | "inPerson";

export type PaymentGateway = "saman" | "mellat" | "parsian";

const COURIER_DELIVERY_FEE = 100_000;
const CART_CHECKOUT_STORAGE_KEY = "tarkhineh-cart-checkout";

type PersistedCartCheckoutState = {
  deliveryMethod: DeliveryMethod | null;
  paymentMethod: PaymentMethod;
  paymentGateway: PaymentGateway;
  selectedAddressId: string | null;
};

const isPersistedCartCheckoutState = (
  value: unknown,
): value is PersistedCartCheckoutState => {
  if (!value || typeof value !== "object") return false;

  const state = value as Record<string, unknown>;

  return (
    (state.deliveryMethod === null ||
      state.deliveryMethod === "courier" ||
      state.deliveryMethod === "pickup") &&
    (state.paymentMethod === "online" || state.paymentMethod === "inPerson") &&
    (state.paymentGateway === "saman" ||
      state.paymentGateway === "mellat" ||
      state.paymentGateway === "parsian") &&
    (state.selectedAddressId === null ||
      typeof state.selectedAddressId === "string")
  );
};

type CartCheckoutContextValue = {
  deliveryMethod: DeliveryMethod | null;
  paymentMethod: PaymentMethod;
  paymentGateway: PaymentGateway;
  selectedAddressId: string | null;
  courierDeliveryFee: number;
  isDeliveryStepComplete: boolean;
  setDeliveryMethod: (method: DeliveryMethod) => void;
  setPaymentMethod: (method: PaymentMethod) => void;
  setPaymentGateway: (gateway: PaymentGateway) => void;
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
    useState<DeliveryMethod | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("online");
  const [paymentGateway, setPaymentGateway] =
    useState<PaymentGateway>("saman");
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    null,
  );
  const [isStorageLoaded, setIsStorageLoaded] = useState(false);

  useEffect(() => {
    const storedState = window.localStorage.getItem(CART_CHECKOUT_STORAGE_KEY);
    let parsedStoredState: PersistedCartCheckoutState | null = null;

    if (storedState) {
      try {
        const parsedState: unknown = JSON.parse(storedState);

        if (isPersistedCartCheckoutState(parsedState)) {
          parsedStoredState = parsedState;
        }
      } catch {
        window.localStorage.removeItem(CART_CHECKOUT_STORAGE_KEY);
      }
    }

    queueMicrotask(() => {
      if (parsedStoredState) {
        setDeliveryMethod(parsedStoredState.deliveryMethod);
        setPaymentMethod(parsedStoredState.paymentMethod);
        setPaymentGateway(parsedStoredState.paymentGateway);
        setSelectedAddressId(parsedStoredState.selectedAddressId);
      }

      setIsStorageLoaded(true);
    });

    const handleStorage = (event: StorageEvent) => {
      if (event.key !== CART_CHECKOUT_STORAGE_KEY || !event.newValue) return;

      try {
        const parsedState: unknown = JSON.parse(event.newValue);

        if (isPersistedCartCheckoutState(parsedState)) {
          setDeliveryMethod(parsedState.deliveryMethod);
          setPaymentMethod(parsedState.paymentMethod);
          setPaymentGateway(parsedState.paymentGateway);
          setSelectedAddressId(parsedState.selectedAddressId);
        }
      } catch {
        // Ignore malformed state from another tab.
      }
    };

    window.addEventListener("storage", handleStorage);

    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  useEffect(() => {
    if (!isStorageLoaded) return;

    const state: PersistedCartCheckoutState = {
      deliveryMethod,
      paymentMethod,
      paymentGateway,
      selectedAddressId,
    };

    window.localStorage.setItem(
      CART_CHECKOUT_STORAGE_KEY,
      JSON.stringify(state),
    );
  }, [
    deliveryMethod,
    paymentMethod,
    paymentGateway,
    selectedAddressId,
    isStorageLoaded,
  ]);

  const isDeliveryStepComplete =
    deliveryMethod === "pickup" ||
    (deliveryMethod === "courier" && selectedAddressId !== null);

  const value = useMemo(
    () => ({
      deliveryMethod,
      paymentMethod,
      paymentGateway,
      selectedAddressId,
      courierDeliveryFee: COURIER_DELIVERY_FEE,
      isDeliveryStepComplete,
      setDeliveryMethod,
      setPaymentMethod,
      setPaymentGateway,
      setSelectedAddressId,
    }),
    [
      deliveryMethod,
      paymentMethod,
      paymentGateway,
      selectedAddressId,
      isDeliveryStepComplete,
    ],
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
    throw new Error(
      "useCartCheckout must be used within a CartCheckoutProvider",
    );
  }

  return context;
}
