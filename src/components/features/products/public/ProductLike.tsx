"use client";

import { useCallback, useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Heart } from "iconsax-reactjs";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useGetUser } from "@/hooks/useAuth";
import { productQueryKeys, useLikeProduct } from "@/hooks/useProducts";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";

interface ProductLikeProps {
  product: Product;
  className?: string;
  onSuccess?: (isLiked: boolean) => void;
}

export default function ProductLike({
  product,
  className,
  onSuccess,
}: ProductLikeProps) {
  const queryClient = useQueryClient();
  const { data: userData } = useGetUser();

  const isAuthenticated = Boolean(userData?.user);
  const likeMutation = useLikeProduct(product._id);

  const [isLiked, setIsLiked] = useState(product.isLiked);

  useEffect(() => {
    if (!likeMutation.isPending) {
      setIsLiked(product.isLiked);
    }
  }, [product.isLiked, likeMutation.isPending]);

  const handleLike = useCallback(() => {
    if (!isAuthenticated) {
      toast.error("برای افزودن به علاقه‌مندی ابتدا وارد حساب کاربری شوید", {
        id: "product-like-auth",
      });
      return;
    }

    if (likeMutation.isPending) return;

    const previousIsLiked = isLiked;

    setIsLiked(!previousIsLiked);

    likeMutation.mutate(undefined, {
      onSuccess: ({ message, isLiked: serverIsLiked }) => {
        setIsLiked(serverIsLiked);
        toast.success(message);
        onSuccess?.(serverIsLiked);
        queryClient.invalidateQueries({ queryKey: ["get-user"] });
        queryClient.invalidateQueries({
          queryKey: productQueryKeys.all,
        });
      },
      onError: (error) => {
        setIsLiked(previousIsLiked);
        toast.error(error.message);
      },
    });
  }, [isAuthenticated, isLiked, likeMutation, onSuccess, queryClient]);

  return (
    <Button
      type="button"
      variant="ghost"
      disabled={likeMutation.isPending}
      onClick={handleLike}
      className={cn("p-0", className)}
    >
      <Heart
        variant={isLiked ? "Bold" : "Outline"}
        className={cn(
          isLiked
            ? "text-error-light hover:text-error-light"
            : "text-gray-7 hover:text-gray-7",
        )}
      />
    </Button>
  );
}
