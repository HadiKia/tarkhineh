import type { Product, ProductBreadcrumbData } from "@/types";

import Breadcrumbs from "@/components/common/BreadCrumbs";
import ProductGallery from "@/components/features/products/public/ProductGallery";
import { Button } from "@/components/ui/button";
import ProductLike from "@/components/features/products/public/ProductLike";
import { ArrowRight, ShoppingCart } from "iconsax-reactjs";
import { formatPrice, toPersianDigits } from "@/utils/numberFormatter";
import ProductRating from "@/components/features/products/public/ProductRating";

interface ProductDetailsProps {
  product: Product;
  productBreadcrumbData: ProductBreadcrumbData;
}

interface DiscountBadgeProps {
  price: number;
  discount: number;
}

function DiscountBadge({ price, discount }: DiscountBadgeProps) {
  return (
    <>
      <span className="text-xs text-gray-5 line-through lg:text-base">
        {formatPrice(price)}
      </span>

      <span className="rounded-lg bg-error-extraLight px-2 py-0.5 text-xs font-medium text-error">
        {toPersianDigits(discount)}%
      </span>
    </>
  );
}

export default function ProductDetails({
  product,
  productBreadcrumbData,
}: ProductDetailsProps) {
  const {
    title,
    description,
    imageUrls,
    price,
    offPrice,
    discount,
    countInStock,
    category,
    numReviews,
  } = product;
  const { mealCourseTitle, mealCourseEnglishTitle, foodGroupEnglishTitle } =
    productBreadcrumbData;

  const foodGroupHref = mealCourseEnglishTitle
    ? `/menu?mealCourse=${mealCourseEnglishTitle}&foodGroup=${foodGroupEnglishTitle}`
    : `/menu?foodGroup=${foodGroupEnglishTitle}`;

  const breadcrumbs = [
    {
      label: "منو",
      href: "/menu",
    },
    ...(mealCourseTitle && mealCourseEnglishTitle
      ? [
          {
            label: mealCourseTitle,
            href: `/menu?mealCourse=${mealCourseEnglishTitle}`,
          },
        ]
      : []),
    {
      label: category.title,
      href: foodGroupHref,
    },
    {
      label: title,
    },
  ];

  const hasDiscount = discount > 0;
  const isFree = offPrice <= 0;
  const isOutOfStock = countInStock === 0;

  return (
    <div className=" mb-6 md:pb-12">
      <div className="bg-primary">
        <div className="max-w-306 mx-auto px-4 xl:px-0 py-2 lg:py-3 flex items-center justify-between">
          <Button variant="link" className="text-white px-0">
            <ArrowRight className="size-6" />
          </Button>
          <h2 className="flex-1 text-center text-white text-xl font-bold lg:text-2xl">
            جزئیات محصول
          </h2>

          <div className="size-6.5" />
        </div>
      </div>

      <div className="max-w-306 mx-auto px-4 xl:px-0">
        <Breadcrumbs breadcrumbs={breadcrumbs} />

        <div className="grid grid-cols-1 gap-6 lg:gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <ProductGallery title={title} images={imageUrls} />
          </div>

          <div className="lg:col-span-8">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-base lg:text-2xl text-gray-8 font-bold">
                {title}
              </h1>
              <div className="flex items-center gap-4 relative">
                <ProductLike
                  product={product}
                  className="size-6 [&_svg:not([class*='size-'])]:size-6 "
                />
                <ShoppingCart className="size-6 text-gray-7" />
              </div>
            </div>

            <div className="flex flex-col gap-y-2 lg:gap-y-4 px-2 py-1 lg:px-4 lg:py-2 border border-gray-4 rounded-lg divide-y divide-gray-4 mb-6">
              <div className="flex flex-col gap-y-1 pb-2 lg:pb-4">
                <h5 className="text-sm lg:text-lg text-gray-8">محتویات</h5>
                <p className="text-xs lg:text-base text-gray-7">
                  {description}
                </p>
              </div>
              <div className="flex items-center justify-between pb-2 lg:pb-4">
                <h5 className="text-sm lg:text-lg text-gray-8">امتیاز</h5>

                <div className="flex items-center gap-1">
                  <span className="text-xs lg:text-base text-gray-7">
                    (<span>{toPersianDigits(numReviews)}</span>
                    <span> نظر</span>)
                  </span>
                  <ProductRating product={product} />
                </div>
              </div>
              <div className="flex items-center justify-between pb-2">
                <h5 className="text-sm lg:text-lg text-gray-8">قیمت</h5>
                <div className="flex flex-col items-center">
                  {hasDiscount && (
                    <div className="flex items-center gap-2">
                      <DiscountBadge price={price} discount={discount} />
                    </div>
                  )}

                  {isFree ? (
                    <span className="text-gray-8 text-sm lg:text-lg">
                      رایگان
                    </span>
                  ) : (
                    <div className="flex items-center gap-2 text-sm text-gray-8 lg:gap-1 lg:text-lg">
                      <span>{formatPrice(offPrice)}</span>
                      <span>تومان</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <Button
              type="button"
              disabled={isOutOfStock}
              className="mx-auto block lg:me-0 min-w-38 lg:min-w-61"
            >
              {isOutOfStock ? "ناموجود" : "افزودن به سبد خرید"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
