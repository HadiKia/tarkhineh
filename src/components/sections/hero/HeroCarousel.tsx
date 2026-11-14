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
      <div className="absolute -bottom-px left-1/2 z-10 -translate-x-1/2">
        <div className="relative flex aspect-82/19 w-20.5 items-center justify-center lg:aspect-154/33 lg:w-38.5">
          <div className="relative z-10 flex items-center gap-x-2 py-1.5 lg:py-2.5">
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
          {/* desktop svg */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 154 33"
            className="pointer-events-none absolute inset-0 z-0 hidden h-full w-full lg:block"
            fill="none"
            aria-hidden="true"
          >
            <path
              fill="#fff"
              d="M13.15 12.996C15.324 5.566 21.904 0 29.646 0h95.471c7.453 0 13.88 5.162 16.143 12.263C144.25 21.651 148.867 33 153.711 33H.414c5.662 0 10.03-10.77 12.735-20.004"
            />
          </svg>

          {/* mobile svg */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 82 19"
            className="pointer-events-none absolute inset-0 z-0 h-full w-full lg:hidden"
            fill="none"
            aria-hidden="true"
          >
            <path
              fill="#fff"
              d="M81.182 18.909C71.519 15.764 70.945 0 60.783 0H20.171C9.933 0 10.39 19 .154 19H81.78q-.322 0-.598-.091"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
