"use client";

import { useRouter } from "next/navigation";

import SearchSection from "./SearchSection";

type SearchRouteSectionProps = {
  value?: string;
  redirectOnEmpty?: boolean;
  onNavigate?: () => void;
  searchPath?: string;
  emptySearchPath?: string;
  placeholder?: string;
};

export default function SearchRouteSection({
  value = "",
  redirectOnEmpty = false,
  onNavigate,
  searchPath = "/search",
  emptySearchPath = "/menu",
  placeholder,
}: SearchRouteSectionProps) {
  const router = useRouter();

  const handleSearch = (search: string) => {
    if (!search) {
      if (redirectOnEmpty) {
        onNavigate?.();
        router.push(emptySearchPath);
      }
      return;
    }

    onNavigate?.();
    const params = new URLSearchParams({ search });
    router.push(`${searchPath}?${params.toString()}`);
  };

  return (
    <SearchSection
      value={value}
      placeholder={placeholder}
      onSearch={handleSearch}
    />
  );
}
