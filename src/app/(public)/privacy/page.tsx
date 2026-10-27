import InformationTabs from "@/components/sections/information/InformationTabs";
import PrivacyContentSection from "@/components/sections/information/PrivacyContentSection";
import PageHeroSection from "@/components/sections/shared/PageHeroSection";

export default function PrivacyPage() {
  return (
    <>
      <PageHeroSection
        image="/images/privacy/slider.png"
        title="حریم شخصی کاربران"
      />
      <InformationTabs activeTab="privacy" />
      <PrivacyContentSection />
    </>
  );
}
