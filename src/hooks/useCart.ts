import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCouponToCart, removeCouponFromCart } from "@/services/cartService";

export function useAddCouponToCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (couponCode: string) => addCouponToCart(couponCode),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-user"] });
    },
  });
}

export function useRemoveCouponFromCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => removeCouponFromCart(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-user"] });
    },
  });
}
