import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Listbox } from "@headlessui/react";

import showToast from "../helper/showToast";
import { provinces } from "../helper/cities";

// Styles
const titleStyle = "text-sm md:text-lg mb-[12.5px] md:mb-[25px] md:font-medium";
const InputDivStyle = "flex flex-col md:flex-row md:gap-x-3 lg:gap-x-6 md:mb-3";
const inputStyle =
  "w-full outline-none border border-[#CBCBCB] text-sm text-[#353535] placeholder:text-[#717171] placeholder:text-right text-right rounded-md px-3 py-2 md:py-[7px] mb-4 md:text-base";
const inputErrorStyle = "text-[#C30000] text-[11px] mb-3 text-right mr-1";
const listBoxLabelStyle =
  "absolute right-3 -top-2 px-1 text-xs text-[#717171] bg-white";
const listBoxOptionsStyle =
  "absolute right-0 left-0 top-12 bg-white border border-[#EDEDED] rounded-md shadow-md h-36 md:h-48  overflow-x-hidden text-sm md:text-base px-3 text-[#353535] z-10";
const listBoxOptionStyles = "py-[9px] md:px-0.5 cursor-pointer";

const RepresentationRequestForm = () => {
  const [selectedProvince, setSelectedProvince] = useState(provinces[0]);
  const [selectedCity, setSelectedCity] = useState(
    selectedProvince.counties[0]
  );

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
    address: Yup.string().required("لطفا آدرس دقیق خود را وارد کنید"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      phoneNumber: "",
      nationalCode: "",
      address: "",
    },
    onSubmit: () => adviceClickHandler(),
    validationSchema,
  });

  const adviceClickHandler = () => {
    if (
      formik.values.name &&
      formik.values.nationalCode &&
      formik.values.phoneNumber &&
      formik.values.address
    ) {
      showToast("اطلاعات شما با موفقیت ثبت شد", "success");
      formik.resetForm();
    } else {
      showToast("لطفا فرم را تکمیل کنید", "error");
    }
  };

  const handleProvinceChange = (province) => {
    setSelectedProvince(province);
    setSelectedCity(province.counties[0]);
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
        <div className={InputDivStyle}>
          <Listbox value={selectedProvince} onChange={handleProvinceChange}>
            <div className="relative w-full">
              <Listbox.Label className={listBoxLabelStyle}>استان</Listbox.Label>
              <Listbox.Button className={inputStyle}>
                {selectedProvince.name}
              </Listbox.Button>
              <Listbox.Options className={listBoxOptionsStyle}>
                {provinces.map((province, index) => (
                  <>
                    <Listbox.Option
                      key={province.id}
                      value={province}
                      disabled={province.unavailable}
                      className={listBoxOptionStyles}
                    >
                      {province.name}
                    </Listbox.Option>
                    {index !== provinces.length - 1 && (
                      <hr className="border-[#EDEDED]" />
                    )}
                  </>
                ))}
              </Listbox.Options>
            </div>
          </Listbox>

          <Listbox value={selectedCity} onChange={setSelectedCity}>
            <div className="relative w-full">
              <Listbox.Label className={listBoxLabelStyle}>شهر</Listbox.Label>
              <Listbox.Button className={inputStyle}>
                {selectedCity.name}
              </Listbox.Button>
              <Listbox.Options className={listBoxOptionsStyle}>
                {selectedProvince.counties.map((city, index) => (
                  <>
                    <Listbox.Option
                      key={city.id}
                      value={city}
                      disabled={city.unavailable}
                      className={listBoxOptionStyles}
                    >
                      {city.name}
                    </Listbox.Option>
                    {index !== selectedProvince.counties.length - 1 && (
                      <hr className="border-[#EDEDED]" />
                    )}
                  </>
                ))}
              </Listbox.Options>
            </div>
          </Listbox>

          <div className="w-full">
            <input
              type="text"
              name="address"
              placeholder="آدرس دقیق"
              {...formik.getFieldProps("address")}
              className={
                formik.touched.address && formik.errors.address
                  ? `${inputStyle} !mb-2 `
                  : inputStyle
              }
            />
            {formik.touched.address && formik.errors.address && (
              <p className={inputErrorStyle}>{formik.errors.address}</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default RepresentationRequestForm;
