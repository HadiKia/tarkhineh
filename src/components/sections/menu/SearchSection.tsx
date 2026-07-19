"use client";

import Search from "@/components/common/Search";
import { useMenuContext } from "@/contexts/MenuContext";

export default function SearchSection() {
  const { selectedSearch, onSearch } = useMenuContext();

  return (
    <Search
      value={selectedSearch ?? ""}
      placeholder="جستجوی غذا..."
      onSearch={onSearch}
    />
  );
}
