import ContactBranchesSection from "@/components/sections/contact/ContactBranchesSection";
import PageHeroSection from "@/components/sections/shared/PageHeroSection";

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
