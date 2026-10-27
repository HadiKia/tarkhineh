import FaqContentSection from "@/components/sections/information/FaqContentSection";
import InformationTabs from "@/components/sections/information/InformationTabs";
import PageHeroSection from "@/components/sections/shared/PageHeroSection";

export default function FaqPage() {
  return (
    <>
      <PageHeroSection
        image="/images/faq/slider.png"
        title="سوالات متداول از ترخینه"
      />
      <InformationTabs activeTab="faq" />
      <FaqContentSection />
    </>
  );
}
