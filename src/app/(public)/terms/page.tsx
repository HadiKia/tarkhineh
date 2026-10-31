import InformationTabs from "@/components/sections/information/InformationTabs";
import TermsContentSection from "@/components/sections/information/TermsContentSection";
import type { Metadata } from "next";
import PageHeroSection from "@/components/sections/shared/PageHeroSection";

export const metadata: Metadata = {
  title: "قوانین و مقررات",
};

export default function page() {
  return (
    <>
      <PageHeroSection image="/images/terms/slider.png" title="قوانین ترخینه" />
      <InformationTabs activeTab="terms" />
      <TermsContentSection />
    </>
  );
}
