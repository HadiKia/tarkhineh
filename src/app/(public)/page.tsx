import HeroCarousel from "@/components/sections/hero/HeroCarousel";
import type { Metadata } from "next";
import BranchesSection from "@/components/sections/home/BranchesSection";
import IntroductionSection from "@/components/sections/home/IntroductionSection";
import MealCourseSection from "@/components/sections/home/MealCourseSection";
import SearchRouteSection from "@/components/sections/search/SearchRouteSection";
import { HOME_HERO_SLIDES } from "@/constants/homeHero";

export const metadata: Metadata = {
  title: "سفارش آنلاین غذا",
};

export default function Home() {
  return (
    <>
      <HeroCarousel slides={HOME_HERO_SLIDES} />
      <div className="mx-auto w-full max-w-306 px-4 pt-6 lg:hidden">
        <SearchRouteSection />
      </div>
      <MealCourseSection />
      <IntroductionSection />
      <BranchesSection />
    </>
  );
}
