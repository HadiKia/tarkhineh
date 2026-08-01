"use client";

import EmptyState from "@/components/common/EmptyState";
import { Button } from "@/components/ui/button";

export default function MenuNotFound() {
  const handleReturnToMenu = () => {
    // Use window.location to force a full page reload and clear the not-found state.
    // Client-side navigation via router.push() doesn't clear the not-found boundary.
    window.location.replace("/menu");
  };

  return (
    <div className="container mx-auto py-12">
      <EmptyState
        title="دسته‌بندی مورد نظر یافت نشد"
        className="border-none my-20"
        action={
          <Button
            variant="default"
            className="w-38 lg:w-72"
            onClick={handleReturnToMenu}
          >
            بازگشت به منو
          </Button>
        }
      />
    </div>
  );
}
