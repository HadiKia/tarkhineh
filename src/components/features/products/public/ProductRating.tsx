"use client";

import { useCallback, useState } from "react";
import { toast } from "sonner";

import { Rating } from "@/components/ui/rating";
import { useGetUser } from "@/hooks/useAuth";
import { useRateProduct } from "@/hooks/useProducts";
import { Product } from "@/types";

interface ProductRatingProps {
  product: Product;
}

export default function ProductRating({ product }: ProductRatingProps) {
  const { data: userData } = useGetUser();

  const isAuthenticated = Boolean(userData?.user);
  const rateMutation = useRateProduct(product._id);

  const initialRating = product.rating;
  const [localRating, setLocalRating] = useState(initialRating);

  const handleValueChange = useCallback(
    (value: number) => {
      if (!isAuthenticated) {
        toast.error("برای ثبت امتیاز ابتدا وارد حساب کاربری شوید", {
          id: "product-rating-auth",
        });
        return;
      }

      if (rateMutation.isPending || value === localRating) {
        return;
      }

      setLocalRating(value);

      rateMutation.mutate(
        { rating: value },
        {
          onSuccess: ({ rating, message }) => {
            setLocalRating(rating);
            toast.success(message);
          },
          onError: (error) => {
            setLocalRating(initialRating);
            toast.error(error.message);
          },
        },
      );
    },
    [initialRating, isAuthenticated, localRating, rateMutation],
  );

  return (
    <div dir="ltr">
      <Rating
        className="size-4 lg:size-6"
        precision={0.5}
        value={localRating}
        onValueChange={handleValueChange}
      />
    </div>
  );
}
