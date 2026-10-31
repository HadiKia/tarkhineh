import InformationTabs from "@/components/sections/information/InformationTabs";
import PrivacyContentSection from "@/components/sections/information/PrivacyContentSection";
import type { Metadata } from "next";
import PageHeroSection from "@/components/sections/shared/PageHeroSection";

export const metadata: Metadata = {
  title: "حریم خصوصی",
};

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
