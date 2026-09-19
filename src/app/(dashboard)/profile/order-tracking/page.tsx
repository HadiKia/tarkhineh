import { cookies } from "next/headers";
import Link from "next/link";

import EmptyState from "@/components/common/EmptyState";
import OrderTrackingSection from "@/components/features/orders/OrderTrackingSection";
import DashboardHeader from "@/components/layouts/dashboard/DashboardHeader";
import { Button } from "@/components/ui/button";
import { getUserProfile } from "@/services/authService";

export default async function ProfileOrderTrackingsPage() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();
  const data = await getUserProfile({ cookieHeader });
  const payments = data?.payments ?? [];

  return (
    <>
      <DashboardHeader title="سفارشات" />

      {payments.length > 0 ? (
        <OrderTrackingSection payments={payments} />
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
