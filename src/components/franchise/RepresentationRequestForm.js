import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import showToast from "../helper/showToast";

// Styles
const titleStyle = "text-sm md:text-lg mb-[12.5px] md:mb-[25px] md:font-medium";
const InputDivStyle = "flex flex-col md:flex-row md:gap-x-3 lg:gap-x-6 md:mb-3";
const inputStyle =
  "w-full outline-none border border-[#CBCBCB] text-sm text-[#353535] placeholder:text-[#717171] placeholder:text-right rounded-md px-3 py-2 md:py-[7px] mb-4 md:text-base";
const inputErrorStyle = "text-[#C30000] text-[11px] mb-3 text-right mr-1";

const RepresentationRequestForm = () => {
  const nationalCode = /^[0-9]{10}$/;
  const phoneReg = "^(\\+98|0)?9\\d{9}$";

  const validationSchema = Yup.object({
    name: Yup.string()
      .max(34, "نام و نام خانوادگی باید کمتر از ۳۴ حرف باشد")
      .required("وارد کردن نام و نام خانوادگی الزامی است"),
    nationalCode: Yup.string()
      .matches(nationalCode, "کدملی وارد شده معتبر نیست")
      .required("وارد کردن کدملی الزامی است"),
    phoneNumber: Yup.string()
      .matches(phoneReg, "شماره همراه وارد شده معتبر نیست")
      .required("وارد کردن شماره تماس الزامی است"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      phoneNumber: "",
      nationalCode: "",
      
    },
    onSubmit: () => adviceClickHandler(),
    validationSchema,
  });

  const adviceClickHandler = () => {
    if (
      formik.values.name &&
      formik.values.nationalCode &&
      formik.values.phoneNumber
    ) {
      showToast("درخواست شما با موفقیت ثبت شد", "success");
      formik.resetForm();
    } else {
      showToast("لطفا فرم را تکمیل کنید", "error");
    }
  };

  return (
    <>
      <div className="mb-1 md:mb-6">
        <h3 className={titleStyle}>مشخصات فرد متقاضی</h3>
        <div className={InputDivStyle}>
          <div className="w-full">
            <input
              type="text"
              name="name"
              placeholder="نام و نام خانوادگی"
              {...formik.getFieldProps("name")}
              className={
                formik.touched.name && formik.errors.name
                  ? `${inputStyle} !mb-2 `
                  : inputStyle
              }
            />
            {formik.touched.name && formik.errors.name && (
              <p className={inputErrorStyle}>{formik.errors.name}</p>
            )}
          </div>

          <div className="w-full">
            <input
              type="text"
              name="nationalCode"
              placeholder="کدملی"
              {...formik.getFieldProps("nationalCode")}
              className={
                formik.touched.nationalCode && formik.errors.nationalCode
                  ? `${inputStyle} !mb-2 `
                  : inputStyle
              }
            />
            {formik.touched.nationalCode && formik.errors.nationalCode && (
              <p className={inputErrorStyle}>{formik.errors.nationalCode}</p>
            )}
          </div>

          <div className="w-full">
            <input
              type="text"
              name="phoneNumber"
              placeholder="شماره تماس"
              {...formik.getFieldProps("phoneNumber")}
              className={
                formik.touched.phoneNumber && formik.errors.phoneNumber
                  ? `${inputStyle} !mb-2 `
                  : inputStyle
              }
            />
            {formik.touched.phoneNumber && formik.errors.phoneNumber && (
              <p className={inputErrorStyle}>{formik.errors.phoneNumber}</p>
            )}
          </div>
        </div>
      </div>

      <div>
        <h3 className={titleStyle}>آدرس ملک متقاضی</h3>
              
      </div>
    </>
  );
};

export default RepresentationRequestForm;
