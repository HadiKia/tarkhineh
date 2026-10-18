import AboutDescriptionSection from "@/components/sections/about/AboutDescriptionSection";
import AboutHeroSection from "@/components/sections/about/AboutHeroSection";
import AboutValuesSection from "@/components/sections/about/AboutValuesSection";

export default function AboutPage() {
  return (
    <div className="flex flex-1 flex-col">
      <AboutHeroSection />
      <AboutDescriptionSection />
      <div className="mt-auto">
        <AboutValuesSection />
      </div>
    </div>
  );
}
