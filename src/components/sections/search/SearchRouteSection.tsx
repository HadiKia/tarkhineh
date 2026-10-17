"use client";

import { useRouter } from "next/navigation";

import SearchSection from "./SearchSection";

type SearchRouteSectionProps = {
  value?: string;
  redirectOnEmpty?: boolean;
};

export default function SearchRouteSection({
  value = "",
  redirectOnEmpty = false,
}: SearchRouteSectionProps) {
  const router = useRouter();

  const handleSearch = (search: string) => {
    if (!search) {
      if (redirectOnEmpty) {
        router.push("/menu");
      }
      return;
    }

    const params = new URLSearchParams({ search });
    router.push(`/search?${params.toString()}`);
  };

  return <SearchSection value={value} onSearch={handleSearch} />;
}
