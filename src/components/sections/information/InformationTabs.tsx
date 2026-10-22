import { cn } from "@/lib/utils";
import Link from "next/link";

type InformationTab = "faq" | "terms" | "privacy";

type InformationTabsProps = {
  activeTab: InformationTab;
};

const tabs: { label: string; href: string; value: InformationTab }[] = [
  { label: "سوالات متداول", href: "/faq", value: "faq" },
  { label: "قوانین ترخینه", href: "/terms", value: "terms" },
  { label: "حریم خصوصی", href: "/privacy", value: "privacy" },
];

export default function InformationTabs({ activeTab }: InformationTabsProps) {
  return (
    <nav className="bg-gray-2">
      <div className="flex items-center gap-4 lg:gap-8 mx-auto w-full max-w-306 px-4 xl:px-0">
        {tabs.map((tab) => (
          <Link
            key={tab.value}
            href={tab.href}
            className={cn(
              "text-xs lg:text-xl text-gray-7 border-b border-transparent py-2.5 lg:py-4.5",
              tab.value === activeTab &&
                "text-sm lg:text-xl font-medium lg:font-bold text-primary border-primary",
            )}
          >
            {tab.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
