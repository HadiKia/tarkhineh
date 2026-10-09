import HeroCarousel from "@/components/sections/hero/HeroCarousel";
import { HOME_HERO_SLIDES } from "@/constants/homeHero";

export default function Home() {
  return (
    <>
      <HeroCarousel slides={HOME_HERO_SLIDES} />
    </>
  );
}
