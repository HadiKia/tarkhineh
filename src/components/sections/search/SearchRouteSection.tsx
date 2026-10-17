"use client";

import { useRouter } from "next/navigation";

import SearchSection from "./SearchSection";

type SearchRouteSectionProps = {
  value?: string;
  redirectOnEmpty?: boolean;
  onNavigate?: () => void;
};

export default function SearchRouteSection({
  value = "",
  redirectOnEmpty = false,
  onNavigate,
}: SearchRouteSectionProps) {
  const router = useRouter();

  const handleSearch = (search: string) => {
    if (!search) {
      if (redirectOnEmpty) {
        onNavigate?.();
        router.push("/menu");
      }
      return;
    }

    onNavigate?.();
    const params = new URLSearchParams({ search });
    router.push(`/search?${params.toString()}`);
  };

  return <SearchSection value={value} onSearch={handleSearch} />;
}
