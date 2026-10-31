import AboutDescriptionSection from "@/components/sections/about/AboutDescriptionSection";
import AboutValuesSection from "@/components/sections/about/AboutValuesSection";
import type { Metadata } from "next";
import PageHeroSection from "@/components/sections/shared/PageHeroSection";

export const metadata: Metadata = {
  title: "درباره ترخینه",
};

export default function AboutPage() {
  return (
    <div className="flex flex-1 flex-col">
      <PageHeroSection
        image="/images/about/slider.png"
        title="درباره ترخینه بیشتر بدانید!"
      />
      <AboutDescriptionSection />
      <div className="mt-auto">
        <AboutValuesSection />
      </div>
    </div>
  );
}
