import React, { useState } from "react";
import { createQueryObject } from "../helper/functions";
// Icons
import { searchIcon } from "../../icons/homePageIcons";
import { searchDesktopIcon } from "../../icons/foodsPageIcons";
// Styles
export const searchBoxStyle =
  "flex items-center justify-between px-4 h-9 border border-[#CBCBCB] rounded-md mb-[1.5em] md:relative md:top-1 lg:w-[400px] xl:w-[490px] lg:h-10 lg:rounded-lg";
export const inputSearchStyle =
  "bg-transparent w-full pl-2 outline-none text-[#353535] text-sm placeholder:text-xs placeholder:text-[#353535]";

const SearchProduct = ({ setQuery }) => {
  const [search, setSearch] = useState("");

  const searchHandler = (event) => {
    event.preventDefault();
    setQuery((query) => createQueryObject(query, { search }));
  };

  return (
    <form className={searchBoxStyle} onSubmit={searchHandler}>
      <input
        type="text"
        placeholder="جستجو"
        className={inputSearchStyle}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button>
        <span className="lg:hidden">{searchIcon}</span>
        <span className="hidden lg:block">{searchDesktopIcon}</span>
      </button>
    </form>
  );
};

export default SearchProduct;
