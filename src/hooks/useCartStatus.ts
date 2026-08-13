import { useGetUser } from "@/hooks/useAuth";
import useHydrated from "@/hooks/useHydrated";

export default function useCartStatus() {
  const { data, isLoading } = useGetUser();
  const isHydrated = useHydrated();
  const user = data?.user;
  const hasCartItems = isHydrated && Boolean(user?.cart?.products?.length);

  return {
    user,
    isGuest: !isLoading && !user,
    hasCartItems,
    isLoading,
    isHydrated,
  };
}
