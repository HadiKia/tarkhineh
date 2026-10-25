import InformationTabs from "@/components/sections/information/InformationTabs";
import TermsContentSection from "@/components/sections/information/TermsContentSection";
import PageHeroSection from "@/components/sections/shared/PageHeroSection";

export default function page() {
  return (
    <>
      <PageHeroSection image="/images/terms/slider.png" title="قوانین ترخینه" />
      <InformationTabs activeTab="terms" />
      <TermsContentSection />
    </>
  );
}
