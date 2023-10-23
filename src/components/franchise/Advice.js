import React from "react";
import AdviceInput from "./AdviceInput";
import { useFormik } from "formik";
import * as Yup from "yup";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

import showToast from "../helper/showToast";

// Styles
const adviceTitleStyle =
  "mb-4 pt-6 font-bold text-[15px] text-center md:text-xl md:pt-6 md:mb-6";
export const buttonStyle =
  "px-3 py-2 bg-[#417F56] text-sm text-white font-medium rounded-md md:px-10 md:py-2 md:text-base";

const Advice = () => {
  const phoneReg = "^(\\+98|0)?9\\d{9}$";

  const validationSchema = Yup.object({
    name: Yup.string()
      .max(34, "نام و نام خانوادگی باید کمتر از ۳۴ حرف باشد")
      .required("وارد کردن نام و نام خانوادگی الزامی است"),
    phoneNumber: Yup.string()
      .matches(phoneReg, "شماره همراه وارد شده معتبر نیست")
      .required("وارد کردن شماره همراه الزامی است"),
    idealDate: Yup.date().required(),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      phoneNumber: "",
      idealDate: null,
    },
    onSubmit: () => adviceClickHandler(),
    validationSchema,
  });

  const adviceClickHandler = () => {
    if (
      formik.values.name &&
      formik.values.phoneNumber &&
      formik.values.idealDate
    ) {
      showToast("درخواست شما با موفقیت ثبت شد", "success");
      formik.resetForm();
    } else {
      showToast("لطفا فرم را تکمیل کنید", "error");
    }
  };
  return (
    <div className="border-b border-[#CBCBCB] pb-5 md:pb-12 md:mb-6">
      <h3 className={adviceTitleStyle}>دریافت مشاوره</h3>
      <div className="flex flex-col md:flex-row md:gap-x-3 lg:gap-x-6 md:mb-3">
        <AdviceInput
          name="name"
          placeholder="نام و نام خانوادگی"
          formik={formik}
          formikError={formik.errors.name}
          formikTouched={formik.touched.name}
        />
        <AdviceInput
          name="phoneNumber"
          placeholder="شماره همراه"
          dir="ltr"
          formik={formik}
          formikError={formik.errors.phoneNumber}
          formikTouched={formik.touched.phoneNumber}
        />
        <DatePicker
          inputClass="datePickerInput"
          calendar={persian}
          locale={persian_fa}
          calendarPosition="bottom-right"
          placeholder="زمان ایده‌آل"
          arrowStyle={{
            display: "none",
          }}
          containerStyle={{
            width: "100%",
          }}
          onChange={(date) => {
            formik.setFieldValue("idealDate", date);
          }}
          onBlur={() => {
            formik.setFieldTouched("idealDate", true);
          }}
        />
      </div>
      <div className="text-center">
        <button onClick={adviceClickHandler} className={buttonStyle}>
          درخواست مشاوره
        </button>
      </div>
    </div>
  );
};

export default Advice;
