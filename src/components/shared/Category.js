import React from "react";
import { createQueryObject } from "../helper/functions";

// Icons
import { arrowLeftIcon } from "../../icons/foodsPageIcons";

export const categoryBoxStyle =
  "flex items-center text-[11px] font-medium px-5  gap-x-2 overflow-scroll overflow-y-hidden md:overflow-x-hidden relative text-[#353535] mb-3 md:text-xs md:mb-4";
export const categoryItemStyle =
  "flex items-center rounded-[10px] gap-x-1 px-2 py-1.5 bg-[#EDEDED] text-[#353535] md:py-2 lg:px-3 md:rounded-full duration-300 cursor-pointer";
const categoryItemActiveStyle = `${categoryItemStyle} !bg-[#E5F2E9] !text-[#417F56]`;

const Category = ({setQuery}) => {
  const categoryHandler = (event) => {
    const { tagName } = event.target;
    const category = event.target.innerText;
    if (tagName !== "LI") return;
    setQuery((query) => createQueryObject(query, { category }));
  };

  return (
    <ul className={categoryBoxStyle} onClick={categoryHandler}>
      <li className={categoryItemStyle}>
        همه
        <span>{arrowLeftIcon}</span>
      </li>
      <li className={categoryItemStyle}>
        غذاهای ایرانی
        <span>{arrowLeftIcon}</span>
      </li>
      <li className={categoryItemStyle}>
        غذاهای غیر ایرانی
        <span>{arrowLeftIcon}</span>
      </li>
      <li className={categoryItemStyle}>
        پیتزاها
        <span>{arrowLeftIcon}</span>
      </li>
      <li className={categoryItemStyle}>
        ساندویچ‌ها
        <span>{arrowLeftIcon}</span>
      </li>
    </ul>
  );
};

export default Category;
