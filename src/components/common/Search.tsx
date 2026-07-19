"use client";

import { useEffect, useState, type FormEvent } from "react";
import { SearchNormal } from "iconsax-reactjs";
import { XIcon } from "lucide-react";

import { Button } from "../ui/button";
import { Field } from "../ui/field";
import { Input } from "../ui/input";

type SearchProps = {
  value?: string;
  placeholder?: string;
  onSearch: (value: string) => void;
};

export default function Search({
  value = "",
  placeholder = "Search...",
  onSearch,
}: SearchProps) {
  const [searchValue, setSearchValue] = useState(value);
  const trimmed = searchValue.trim();

  useEffect(() => {
    setSearchValue(value);
  }, [value]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onSearch(trimmed);
  };

  const handleClear = () => {
    setSearchValue("");
    onSearch("");
  };

  const hasValue = trimmed.length > 0;

  return (
    <form onSubmit={handleSubmit}>
      <Field className="relative">
        <Input
          value={searchValue}
          placeholder={placeholder}
          onChange={(e) => setSearchValue(e.target.value)}
          className="bg-white pe-10"
        />

        {hasValue ? (
          <Button
            type="button"
            variant="ghost"
            onClick={handleClear}
            aria-label="Clear search"
            className="absolute inset-y-0 inset-e-2 w-fit! text-gray-8"
          >
            <XIcon className="size-4 lg:size-6" />
          </Button>
        ) : (
          <Button
            type="submit"
            variant="ghost"
            aria-label="Search"
            className="absolute inset-y-0 inset-e-2 w-fit! text-gray-8"
          >
            <SearchNormal className="size-4 lg:size-6" />
          </Button>
        )}
      </Field>
    </form>
  );
}
