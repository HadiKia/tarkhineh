import { cookies } from "next/headers";

import EmptyState from "@/components/common/EmptyState";
import { getUserProfile } from "@/services/authService";
import DashboardHeader from "@/components/layouts/dashboard/DashboardHeader";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function ProfileFavoritesPage() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();
  const { user } = await getUserProfile({ cookieHeader });
  const likedProducts = user?.likedProducts ?? [];

  return (
    <div className="relative">
      <DashboardHeader title="علاقمندی‌ها" />

      {!likedProducts.length && (
        <EmptyState
          title="شما در حال حاضر هیچ محصولی را به علاقه‌مندی‌ها اضافه نکرده‌اید!"
          action={
            <Button variant="outline" asChild className="w-38 lg:w-72">
              <Link href="/menu">منوی رستوران</Link>
            </Button>
          }
        />
      )}
    </div>
  );
}
