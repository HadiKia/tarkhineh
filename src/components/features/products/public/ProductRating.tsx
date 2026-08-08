"use client";

import { useCallback, useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { Rating } from "@/components/ui/rating";
import { useGetUser } from "@/hooks/useAuth";
import { productQueryKeys, useRateProduct } from "@/hooks/useProducts";
import { Product } from "@/types";

interface ProductRatingProps {
  product: Product;
  onSuccess?: (rating: number) => void;
}

export default function ProductRating({
  product,
  onSuccess,
}: ProductRatingProps) {
  const queryClient = useQueryClient();
  const { data: userData } = useGetUser();

  const isAuthenticated = Boolean(userData?.user);
  const rateMutation = useRateProduct(product._id);

  const [localRating, setLocalRating] = useState(product.rating);

  useEffect(() => {
    if (!rateMutation.isPending) {
      setLocalRating(product.rating);
    }
  }, [product.rating, rateMutation.isPending]);

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

      const previousRating = product.rating;

      setLocalRating(value);

      rateMutation.mutate(
        { rating: value },
        {
          onSuccess: ({ rating, message }) => {
            setLocalRating(rating);
            toast.success(message);
            onSuccess?.(rating);
            queryClient.invalidateQueries({
              queryKey: productQueryKeys.all,
            });
          },
          onError: (error) => {
            setLocalRating(previousRating);
            toast.error(error.message);
          },
        },
      );
    },
    [isAuthenticated, localRating, onSuccess, product.rating, rateMutation, queryClient],
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
