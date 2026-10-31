import FaqContentSection from "@/components/sections/information/FaqContentSection";
import InformationTabs from "@/components/sections/information/InformationTabs";
import type { Metadata } from "next";
import PageHeroSection from "@/components/sections/shared/PageHeroSection";

export const metadata: Metadata = {
  title: "پرسش‌های متداول",
};

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
