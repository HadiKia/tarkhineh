import React from "react";
import { RadioGroup } from "@headlessui/react";

// Icons
import { arrowLeftIcon } from "../../icons/foodsPageIcons";

export const categoryBoxStyle =
  "flex items-center text-[11px] font-medium pl-5 mr-5 gap-x-2 overflow-scroll overflow-y-hidden md:overflow-x-hidden relative text-[#353535] mb-3 md:text-xs pb-2 md:pb-0 md:mb-4";
export const categoryItemStyle =
  "flex items-center rounded-[10px] gap-x-1 px-2 py-1.5 bg-[#EDEDED] text-[#353535] md:py-2 lg:px-3 md:rounded-full duration-300 cursor-pointer";

const Category = ({ selectedCategory, setSelectedCategory }) => {
  return (
    <RadioGroup
      value={selectedCategory}
      onChange={setSelectedCategory}
      className={categoryBoxStyle}
    >
      <RadioGroup.Option value="all">
        {({ checked }) => (
          <span
            className={
              checked
                ? `${categoryItemStyle} !bg-[#E5F2E9] !text-[#417F56]`
                : categoryItemStyle
            }
          >
            <span>همه</span>
            <span>{arrowLeftIcon}</span>
          </span>
        )}
      </RadioGroup.Option>

      <RadioGroup.Option value="غذاهای ایرانی">
        {({ checked }) => (
          <span
            className={
              checked
                ? `${categoryItemStyle} !bg-[#E5F2E9] !text-[#417F56]`
                : categoryItemStyle
            }
          >
            <span className="w-[67px]">غذاهای ایرانی</span>
            <span>{arrowLeftIcon}</span>
          </span>
        )}
      </RadioGroup.Option>

      <RadioGroup.Option value="غذاهای غیر ایرانی">
        {({ checked }) => (
          <span
            className={
              checked
                ? `${categoryItemStyle} !bg-[#E5F2E9] !text-[#417F56]`
                : categoryItemStyle
            }
          >
            <span className="w-[86px]">غذاهای غیر ایرانی</span>
            <span>{arrowLeftIcon}</span>
          </span>
        )}
      </RadioGroup.Option>

      <RadioGroup.Option value="پیتزاها">
        {({ checked }) => (
          <span
            className={
              checked
                ? `${categoryItemStyle} !bg-[#E5F2E9] !text-[#417F56]`
                : categoryItemStyle
            }
          >
            <span>پیتزاها</span>
            <span>{arrowLeftIcon}</span>
          </span>
        )}
      </RadioGroup.Option>

      <RadioGroup.Option value="ساندویچ‌ها">
        {({ checked }) => (
          <span
            className={
              checked
                ? `${categoryItemStyle} !bg-[#E5F2E9] !text-[#417F56]`
                : categoryItemStyle
            }
          >
            <span>ساندویچ‌ها</span>
            <span>{arrowLeftIcon}</span>
          </span>
        )}
      </RadioGroup.Option>
    </RadioGroup>
  );
};

export default Category;
