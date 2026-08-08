import { cookies } from "next/headers";
import Link from "next/link";

import EmptyState from "@/components/common/EmptyState";
import FavoriteProductGrid from "@/components/features/products/favorites/FavoriteProductGrid";
import DashboardHeader from "@/components/layouts/dashboard/DashboardHeader";
import { Button } from "@/components/ui/button";
import { getUserProfile } from "@/services/authService";

export default async function ProfileFavoritesPage() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();
  const { user } = await getUserProfile({ cookieHeader });
  const likedProducts = user?.likedProducts ?? [];

  return (
    <div className="relative">
      <DashboardHeader title="علاقمندی‌ها" />

      {likedProducts.length > 0 ? (
        <FavoriteProductGrid products={likedProducts} />
      ) : (
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
