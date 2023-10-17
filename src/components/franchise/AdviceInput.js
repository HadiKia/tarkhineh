import React from "react";

// Styles
const inputStyle =
  "w-full outline-none border border-[#CBCBCB] text-sm text-[#353535] placeholder:text-[#717171] placeholder:text-right rounded-md px-3 py-2 md:py-[7px] mb-4 md:text-base";
const inputErrorStyle = "text-[#C30000] text-[11px] mb-3 text-right mr-1";
const AdviceInput = ({
  name,
  placeholder,
  formik,
  formikError,
  formikTouched,
  dir,
}) => {
  return (
    <div className="w-full">
      <input
        type="text"
        name={name}
        placeholder={placeholder}
        dir={dir}
        {...formik.getFieldProps(name)}
        className={
          formikTouched && formikError ? `${inputStyle} !mb-2 ` : inputStyle
        }
      />

      {formikTouched && formikError && (
        <p className={inputErrorStyle}>{formikError}</p>
      )}
    </div>
  );
};

export default AdviceInput;
