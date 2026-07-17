"use client";

import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

import type { HeroSlide } from "@/types";

import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect, useRef, useState } from "react";
import { DEFAULT_CAROUSEL_OPTIONS } from "@/constants/carousel";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

type HeroCarouselProps = {
  slides: HeroSlide[];
};

export default function HeroCarousel({ slides }: HeroCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<readonly number[]>([]);

  useEffect(() => {
    if (!api) return;

    setScrollSnaps(api.scrollSnapList());
    setSelectedIndex(api.selectedScrollSnap());

    const onSelect = () => {
      setSelectedIndex(api.selectedScrollSnap());
    };

    api.on("select", onSelect);
    api.on("reInit", onSelect);

    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  const autoplay = useRef(
    Autoplay({
      delay: 5000,
      stopOnInteraction: true,
      stopOnMouseEnter: true,
    }),
  );

  return (
    <section className="relative">
      <Carousel
        setApi={setApi}
        opts={DEFAULT_CAROUSEL_OPTIONS}
        plugins={[autoplay.current]}
      >
        <CarouselContent className="ml-0">
          {slides.map((slide, index) => (
            <CarouselItem key={`${slide.image}-${index}`} className="pl-0">
              <div className="relative h-44 md:h-84">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  priority={index === 0}
                  sizes="100vw"
                  className="object-cover object-center"
                />

                <div className="absolute inset-0 grid place-items-center">
                  <div className="relative grid place-items-center">
                    <h2 className="text-white text-base lg:text-[40px] font-bold">
                      {slide.title}
                    </h2>

                    {slide.link && (
                      <Button
                        variant="default"
                        asChild
                        className="lg:w-46 absolute top-full translate-y-4 lg:translate-y-10"
                      >
                        <Link href={slide.link.href}>{slide.link.title}</Link>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselNext className="left-4 z-10 text-white hover:text-white hidden lg:block" />
        <CarouselPrevious className="right-4 z-10 text-white hover:text-white hidden lg:block" />
      </Carousel>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
        <div className="flex items-end">
          <svg
            className="size-5 lg:size-8 shrink-0"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            <path d="M0 0C10.2 0 10 20 20 20H0V0Z" fill="white" />
          </svg>
          <div className="flex items-center gap-x-1 bg-white py-1.5 lg:py-2.5">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={cn(
                  "size-1 lg:size-2 rounded-full transition-colors ring-2 ring-transparent ",
                  selectedIndex === index
                    ? "bg-primary size-2 lg:size-3 ring-tint-1"
                    : "bg-gray-2",
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          <svg
            className="size-5 shrink-0 scale-x-[-1] lg:size-8"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            <path d="M0 0C10.2 0 10 20 20 20H0V0Z" fill="white" />
          </svg>
        </div>
      </div>
    </section>
  );
}
