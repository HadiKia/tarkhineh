"use client";

import { useMenuContext } from "@/contexts/MenuContext";
import SearchSectionBase from "@/components/sections/search/SearchSection";

export default function SearchSection() {
  const { selectedSearch, onSearch } = useMenuContext();

  return (
    <SearchSectionBase
      value={selectedSearch ?? ""}
      onSearch={onSearch}
    />
  );
}
