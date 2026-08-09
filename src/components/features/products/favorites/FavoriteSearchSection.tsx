"use client";

import Search from "@/components/common/Search";
import useFavoriteUrlState from "@/hooks/useFavoriteUrlState";

export default function FavoriteSearchSection() {
  const { selectedSearch, onSearch } = useFavoriteUrlState();

  return (
    <Search
      value={selectedSearch}
      placeholder="جستجوی غذا..."
      onSearch={onSearch}
    />
  );
}
