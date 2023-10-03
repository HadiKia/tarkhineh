import React from "react";
import { Disclosure } from "@headlessui/react";

// Icons
const chevronIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none">
    <path
      fill="currentColor"
      d="M8.001 4.8c.467 0 .933.18 1.287.533l4.346 4.347a.503.503 0 0 1 0 .707.503.503 0 0 1-.706 0L8.58 6.04a.82.82 0 0 0-1.16 0l-4.347 4.347a.503.503 0 0 1-.706 0 .503.503 0 0 1 0-.707l4.346-4.347c.354-.353.82-.533 1.287-.533Z"
    />
  </svg>
);

// Styles
const disclosureBoxStyle = "border-b border-b-[#CBCBCB]";
const disclosureTitleStyle =
  "flex items-center justify-between w-full px-4 py-2.5 text-[11px] sm:text-[13px] font-medium md:text-base md:py-4 ";
const disclosureDescriptionStyle =
  "text-[11px] text-[#717171] leading-5 px-7 pb-3 md:text-sm md:leading-6 md:pb-4";

const DisclosureItem = ({ title, titleDesktop, description, isLastItem }) => {
  return (
    <Disclosure>
      {({ open }) => (
        <div className={isLastItem ? "" : disclosureBoxStyle}>
          <Disclosure.Button
            className={
              open
                ? `${disclosureTitleStyle} text-[#417F56] !pb-2 md:!pb-4 !font-normal`
                : `${disclosureTitleStyle} text-[#353535]`
            }
          >
            <span className="md:hidden">{title}</span>
            <span className="hidden md:block">{titleDesktop}</span>
            <span
              className={
                open
                  ? "duration-700 md:scale-[1.25]"
                  : "-rotate-180 duration-700 md:scale-[1.25]"
              }
            >
              {chevronIcon}
            </span>
          </Disclosure.Button>

          <Disclosure.Panel className={disclosureDescriptionStyle}>
            {({ close }) => (
              <p
                onClick={async () => {
                  await fetch("/accept-terms", { method: "POST" });
                  close();
                }}
              >
                {description}
              </p>
            )}
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  );
};

export default DisclosureItem;
