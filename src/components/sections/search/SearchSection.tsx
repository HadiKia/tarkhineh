"use client";

import Search from "@/components/common/Search";

type SearchSectionProps = {
  value?: string;
  placeholder?: string;
  onSearch: (value: string) => void;
};

export default function SearchSection({
  value = "",
  placeholder = "جستجوی غذا...",
  onSearch,
}: SearchSectionProps) {
  return (
    <Search
      value={value}
      placeholder={placeholder}
      onSearch={onSearch}
    />
  );
}
