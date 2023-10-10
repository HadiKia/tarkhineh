import React from "react";

// Styles
const inputContainerStyle = "relative flex-1";
const disabledInputStyle =
  "w-full outline-none disabled:bg-white border border-[#CBCBCB] text-[#717171] placeholder:text-[#CBCBCB] md:placeholder:text-white text-sm rounded-md px-3 py-2 md:py-[7px] mb-4 md:text-base duration-500";
const activeInputStyle =
  "w-full outline-none disabled:bg-white border border-[#353535] text-[#353535] placeholder:text-[#CBCBCB] md:placeholder:text-white text-sm rounded-md px-3 py-2 md:py-[7px] mb-4 md:text-base duration-500";
const inputLabelStyle =
  "hidden md:block text-[#353535] text-xs absolute bg-white right-3 -top-2 px-1";
const inputErrorStyle = "text-[#C30000] text-[11px] mb-3 text-right md:mr-1";

const ProfileFormInput = ({
  isDisabled,
  name,
  placeholder,
  formik,
  formikError,
  formikTouched,
}) => {
  return (
    <div className={inputContainerStyle}>
      <input
        type="text"
        name={name}
        placeholder={placeholder}
        disabled={isDisabled}
        {...formik.getFieldProps(name)}
        className={
          isDisabled
            ? disabledInputStyle
            : formikTouched && formikError
            ? `${activeInputStyle} !mb-2`
            : activeInputStyle
        }
      />
      <span
        className={
          isDisabled ? `${inputLabelStyle} !text-[#717171]` : inputLabelStyle
        }
      >
        {placeholder}
      </span>
      {formikTouched && formikError && (
        <p className={inputErrorStyle}>{formikError}</p>
      )}
    </div>
  );
};

export default ProfileFormInput;
