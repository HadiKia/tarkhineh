import React, { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ReactLoading from "react-loading";
import { useFormik } from "formik";
import * as Yup from "yup";
import showToast from "../helper/showToast";

// Actions
import { setLoginStatus } from "../redux/auth/authActions";

// Icons
import { logo } from "../../icons/headerIcons";
import { closeIcon } from "../../icons/mobileMenuIcons";

// Styles
const dialogBgStyle = "fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm";
const dialogDivStyle =
  "flex min-h-full items-center justify-center p-4 text-center";
const dialogPanelStyle =
  "w-full mx-1 transform overflow-hidden rounded-lg bg-white align-middle shadow-xl transition-all md:w-[392px]";
const dialogTitleStyle =
  "relative flex items-center justify-center px-6 py-4 mb-0 md:py-[21px] ";
const dialogCloseButtonStyle = "text-[#717171] absolute left-6";
const dialogInputStyle =
  "w-full outline-none border border-[#353535] text-[#353535] text-sm rounded px-2 py-2.5 mb-5 md:text-base";
const dialogErrorStyle = "text-[#C30000] text-xs mb-4 text-right";
const dialogButtonStyle =
  "w-full py-2.5 bg-[#EDEDED] text-sm rounded mb-6 text-[#CBCBCB]  md:text-base md:mb-6 duration-500";

const SignUp = ({ isOpen, closeModal }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const phoneRegExp = "^(\\+98|0)?9\\d{9}$";

  const validationSchema = Yup.object({
    name: Yup.string()
      .max(15, "نام باید کمتر از ۱۵ حرف باشد")
      .required("وارد کردن نام الزامی است"),
    lastName: Yup.string()
      .max(32, "نام خانوادگی باید کمتر از ۳۲ حرف باشد")
      .required("وارد کردن نام خانوادگی الزامی است"),
    phoneNumber: Yup.string()
      .matches(phoneRegExp, "شماره همراه وارد شده معتبر نیست")
      .required("وارد کردن شماره همراه الزامی است"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      lastName: "",
      phoneNumber: "",
    },
    onSubmit: () => handleClick(),
    validationSchema,
  });

  const handleRegistration = () => {
    localStorage.setItem("name", formik.values.name);
    localStorage.setItem("lastName", formik.values.lastName);
    localStorage.setItem("phoneNumber", formik.values.phoneNumber);
    formik.resetForm();
    dispatch(setLoginStatus(true));
    showToast("خوش آمدید", "success");
  };

  const handleClick = () => {
    if (
      formik.isValid &&
      formik.values.name &&
      formik.values.lastName &&
      formik.values.phoneNumber
    ) {
      setIsLoading(true);

      setTimeout(() => {
        handleRegistration();
        closeModal();
        setIsLoading(false);
      }, 2500);
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className={dialogBgStyle} />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className={dialogDivStyle}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className={dialogPanelStyle}>
                <Dialog.Title className={dialogTitleStyle}>
                  <span className="md:scale-110">{logo}</span>
                  <button
                    onClick={closeModal}
                    className={dialogCloseButtonStyle}
                  >
                    {closeIcon}
                  </button>
                </Dialog.Title>
                <div className="px-7">
                  <p className="mb-4 md:text-lg md:mb-5">ورود/ثبت نام</p>

                  <div className="relative">
                    <input
                      type="text"
                      name="name"
                      {...formik.getFieldProps("name")}
                      className={
                        formik.touched.name && formik.errors.name
                          ? `${dialogInputStyle}!border-[#C30000] !mb-2`
                          : dialogInputStyle
                      }
                    />
                    <span className="text-[#353535] text-xs absolute bg-white right-2 -top-2 px-1">
                      نام
                    </span>
                  </div>
                  {formik.touched.name && formik.errors.name && (
                    <p className={dialogErrorStyle}>{formik.errors.name}</p>
                  )}

                  <div className="relative">
                    <input
                      type="text"
                      name="lastName"
                      {...formik.getFieldProps("lastName")}
                      className={
                        formik.touched.lastName && formik.errors.lastName
                          ? `${dialogInputStyle}!border-[#C30000] !mb-2`
                          : dialogInputStyle
                      }
                    />
                    <span className="text-[#353535] text-xs absolute bg-white right-2 -top-2 px-1">
                      نام خانوادگی
                    </span>
                  </div>
                  {formik.touched.lastName && formik.errors.lastName && (
                    <p className={dialogErrorStyle}>{formik.errors.lastName}</p>
                  )}

                  <div className="relative">
                    <input
                      type="tel"
                      dir="ltr"
                      name="phoneNumber"
                      {...formik.getFieldProps("phoneNumber")}
                      className={
                        formik.touched.phoneNumber && formik.errors.phoneNumber
                          ? `${dialogInputStyle}!border-[#C30000] !mb-2`
                          : dialogInputStyle
                      }
                    />
                    <span className="text-[#353535] text-xs absolute bg-white right-2 -top-2 px-1">
                      شماره همراه
                    </span>
                  </div>

                  {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                    <p className={dialogErrorStyle}>
                      {formik.errors.phoneNumber}
                    </p>
                  )}

                  <button
                    onClick={handleClick}
                    type="submit"
                    variant="contained"
                    className={
                      formik.values.name &&
                      formik.values.lastName &&
                      formik.values.phoneNumber
                        ? `${dialogButtonStyle} !bg-[#417F56] !text-white`
                        : dialogButtonStyle
                    }
                  >
                    {isLoading ? (
                      <>
                        <ReactLoading
                          type="bubbles"
                          color="#FFFFFF"
                          height={20}
                          width={25}
                          className="md:hidden mx-auto"
                        />
                        <ReactLoading
                          type="bubbles"
                          color="#FFFFFF"
                          height={24}
                          width={25}
                          className="hidden md:block mx-auto"
                        />
                      </>
                    ) : (
                      "ادامه"
                    )}
                  </button>

                  <p
                    className="text-[10px] mb-6 text-[#353535] md:text-xs md:mb-7"
                    onClick={closeModal}
                  >
                    ورود و عضویت در ترخینه به منزله قبول{" "}
                    <Link to="/rules" className="text-[#417F56]">
                      قوانین و مقررات
                    </Link>{" "}
                    است.
                  </p>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default SignUp;
