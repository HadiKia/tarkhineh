"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import { PRODUCT_CAROUSEL_OPTIONS } from "@/constants/carousel";
import { cn } from "@/lib/utils";

type ProductGalleryProps = {
  title: string;
  images?: string[];
  className?: string;
};

export default function ProductGallery({
  title,
  images,
  className,
}: ProductGalleryProps) {
  const galleryImages = images ?? [];

  const [api, setApi] = useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setSelectedIndex(api.selectedScrollSnap());
    };

    setSelectedIndex(api.selectedScrollSnap());

    api.on("select", onSelect);
    api.on("reInit", onSelect);

    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  useEffect(() => {
    if (!api) return;

    api.scrollTo(0);
    setSelectedIndex(0);
  }, [api, galleryImages]);

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div className="min-w-0 flex-1 overflow-hidden rounded-lg lg:rounded-2xl">
        <Carousel
          setApi={setApi}
          opts={PRODUCT_CAROUSEL_OPTIONS}
          className="w-full"
        >
          <CarouselContent>
            {galleryImages.map((image, index) => (
              <CarouselItem key={`${image}-${index}`}>
                <div className="relative h-52 overflow-hidden rounded-lg lg:rounded-2xl bg-muted lg:h-auto lg:aspect-square">
                  <Image
                    src={image}
                    alt={`${title}-${index + 1}`}
                    fill
                    priority={index === 0}
                    sizes="(max-width: 1024px) 100vw, 500px"
                    className="object-cover"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      {galleryImages.length > 1 && (
        <div className="flex justify-center lg:flex-wrap gap-3 overflow-x-auto pb-1 scrollbar-thin">
          {galleryImages.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              onClick={() => api?.scrollTo(index)}
              className={cn(
                "relative size-10 lg:size-18 shrink-0 overflow-hidden rounded-md lg:rounded-lg transition-all duration-300 ease-linear",
                selectedIndex === index
                  ? "opacity-100"
                  : "opacity-60 cursor-pointer",
              )}
            >
              <Image
                src={image}
                alt={`${title}-thumbnail-${index + 1}`}
                fill
                sizes="72px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
