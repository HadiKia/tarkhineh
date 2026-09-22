import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

import EmptyState from "@/components/common/EmptyState";
import OrderTrackingSection from "@/components/features/orders/OrderTrackingSection";
import DashboardHeader from "@/components/layouts/dashboard/DashboardHeader";
import { Button } from "@/components/ui/button";
import { getUserProfile } from "@/services/authService";

type OrderTrackingSearchParams = {
  deliveryMethod?: string;
};

const ALLOWED_PARAMS = new Set(["deliveryMethod"]);
const ALLOWED_DELIVERY_METHODS = new Set(["courier", "pickup"]);

export default async function ProfileOrderTrackingsPage({
  searchParams,
}: {
  searchParams: Promise<OrderTrackingSearchParams>;
}) {
  const params = await searchParams;
  const hasUnknownParams = Object.keys(params).some(
    (key) => !ALLOWED_PARAMS.has(key),
  );
  const hasInvalidDeliveryMethod =
    params.deliveryMethod !== undefined &&
    !ALLOWED_DELIVERY_METHODS.has(params.deliveryMethod);

  if (hasUnknownParams || hasInvalidDeliveryMethod) {
    redirect("/profile/order-tracking");
  }

  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();
  const data = await getUserProfile({ cookieHeader });
  const userName = data?.user?.name;
  const payments = data?.payments ?? [];

  return (
    <>
      <DashboardHeader title="سفارشات" />

      {payments.length > 0 ? (
        <OrderTrackingSection payments={payments} userName={userName} />
      ) : (
        <EmptyState
          title="شما در حال حاضر هیچ سفارشی ثبت نکرده‌اید!"
          action={
            <Button variant="outline" asChild className="w-38 lg:w-72">
              <Link href="/menu">منوی رستوران</Link>
            </Button>
          }
        />
      )}
    </>
  );
}
