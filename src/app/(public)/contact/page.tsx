import ContactBranchesSection from "@/components/sections/contact/ContactBranchesSection";
import type { Metadata } from "next";
import PageHeroSection from "@/components/sections/shared/PageHeroSection";

export const metadata: Metadata = {
  title: "تماس با ترخینه",
};

export default function ContactPage() {
  return (
    <>
      <PageHeroSection
        image="/images/contact/slider.png"
        title="با ترخینه در تماس باشید."
      />
      <ContactBranchesSection />
    </>
  );
}
