import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import ProfileFormInput from "./ProfileFormInput";

// Components
import SideBar from "../SideBar";

// Icons
import { arrowRightIcon } from "../../icons/shopCartIcons";
import { editIcon } from "../../icons/addressIcon";

// Styles
import { headerStyle } from "../../components/shopping-cart/ShopCart";
const editButtonStyle =
  "flex items-center gap-x-1 md:gap-x-2 border border-[#417F56] rounded text-[#417F56] px-3 py-[7px] md:px-6 md:py-[7px] ";
const cancelButtonStyle =
  "border border-[#417F56] rounded text-[#417F56] px-2 py-1.5  md:py-[7px] w-full md:w-[130px]";
const saveButtonStyle =
  "border border-[#417F56] bg-[#417F56] rounded text-white px-2 py-1.5  md:py-[7px] w-full md:w-[130px]";

const Profile = () => {
  const [isDisabled, setIsDisabled] = useState(true);

  const phoneReg = "^(\\+98|0)?9\\d{9}$";
  const emailReg =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  useEffect(() => {
    document.title = "پروفایل";
  }, []);

  const validationSchema = Yup.object({
    name: Yup.string()
      .max(15, "نام باید کمتر از ۱۵ حرف باشد")
      .required("وارد کردن نام الزامی است"),
    lastName: Yup.string()
      .max(32, "نام خانوادگی باید کمتر از ۳۲ حرف باشد")
      .required("وارد کردن نام خانوادگی الزامی است"),
    email: Yup.string().matches(emailReg, "ایمیل وارد شده نامعتبر است"),
    phoneNumber: Yup.string()
      .matches(phoneReg, "شماره همراه وارد شده معتبر نیست")
      .required("وارد کردن شماره همراه الزامی است"),
  });

  const formik = useFormik({
    initialValues: {
      name: localStorage.getItem("name"),
      lastName: localStorage.getItem("lastName"),
      email: localStorage.getItem("email") ? localStorage.getItem("email") : "",
      phoneNumber: localStorage.getItem("phoneNumber"),
    },
    onSubmit: () => saveHandler(),
    validationSchema,
  });

  const saveHandler = () => {
    if (formik.isValid) {
      localStorage.setItem("name", formik.values.name);
      localStorage.setItem("lastName", formik.values.lastName);
      localStorage.setItem("email", formik.values.email);
      localStorage.setItem("phoneNumber", formik.values.phoneNumber);
      setIsDisabled(true);
    }
  };

  const cancelHandler = () => {
    formik.errors.name = null;
    formik.errors.lastName = null;
    formik.errors.email = null;
    formik.errors.phoneNumber = null;

    formik.values.name = localStorage.getItem("name");
    formik.values.lastName = localStorage.getItem("lastName");
    formik.values.email = localStorage.getItem("email")
      ? localStorage.getItem("email")
      : "";
    formik.values.phoneNumber = localStorage.getItem("phoneNumber");

    setIsDisabled(true);
  };

  return (
    <div className="container max-w-[1224px] mx-auto px-5 min-h-[calc(100vh_-_239px)] md:min-h-[calc(100vh_-_426px)] md:flex md:gap-x-6">
      <div className="hidden md:block flex-1 md:max-w-[182px] lg:max-w-[248px]">
        <SideBar />
      </div>

      <div className="md:mt-10 flex-1 md:w-[400px] lg:w-[712px] md:border md:border-[#CBCBCB] md:rounded-md md:p-6 md:pb-0 md:mb-12">
        {/* Header */}
        <div
          className={`${headerStyle} md:!block !justify-center relative mt-6 md:mt-0 md:text-[22px] md:border-b md:border-[#CBCBCB] md:pb-2 md:!mb-10`}
        >
          <Link
            to="/dashboard"
            className="absolute right-0 md:hidden"
          >
            {arrowRightIcon}
          </Link>
          <p className="pl-2">پروفایل من</p>
        </div>

        {/* <ProfileForm /> */}
        <div className="md:flex md:items-start md:gap-x-4 md:mb-2">
          <ProfileFormInput
            isDisabled={isDisabled}
            name="name"
            placeholder="نام"
            formik={formik}
            formikError={formik.errors.name}
            formikTouched={formik.touched.name}
          />
          <ProfileFormInput
            isDisabled={isDisabled}
            name="lastName"
            placeholder="نام خانوادگی"
            formik={formik}
            formikError={formik.errors.lastName}
            formikTouched={formik.touched.lastName}
          />
        </div>
        <div className="md:flex md:items-start md:gap-x-4">
          <ProfileFormInput
            isDisabled={isDisabled}
            name="email"
            placeholder="ایمیل (اختیاری)"
            formik={formik}
            formikError={formik.errors.email}
            formikTouched={formik.touched.email}
          />
          <ProfileFormInput
            isDisabled={isDisabled}
            name="phoneNumber"
            placeholder="شماره همراه"
            formik={formik}
            formikError={formik.errors.phoneNumber}
            formikTouched={formik.touched.phoneNumber}
            dir="ltr"
          />
        </div>

        <div className="flex justify-center text-sm md:text-base font-medium mt-7">
          {isDisabled ? (
            <button
              onClick={() => setIsDisabled(false)}
              className={editButtonStyle}
            >
              <span className="md:scale-[1.2]">{editIcon}</span>
              ویرایش اطلاعات شخصی
            </button>
          ) : (
            <div className="flex items-center justify-between gap-x-4 w-full md:w-auto">
              <button onClick={cancelHandler} className={cancelButtonStyle}>
                انصراف
              </button>
              <button onClick={saveHandler} className={saveButtonStyle}>
                ذخیره اطلاعات
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
