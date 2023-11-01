import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// Actions
import { setLoginStatus } from "../redux/auth/authActions";

// Icons
import { closeIcon } from "../../icons/mobileMenuIcons";

// Styles
import {
  dialogBgStyle,
  dialogDivStyle,
  dialogPanelStyle,
  dialogTitleStyle,
  dialogCloseButtonStyle,
  dialogPStyle,
  dialogButtonDivStyle,
  dialogButtonStyle,
} from "../shopping-cart/ShopCart";

const SignOut = ({ isOpen, closeModal }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(setLoginStatus(false));
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    localStorage.removeItem("phoneNumber");
    localStorage.removeItem("addressList");
    navigate("/home");
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
                  <span>خروج</span>
                  <button
                    onClick={closeModal}
                    className={dialogCloseButtonStyle}
                  >
                    {closeIcon}
                  </button>
                </Dialog.Title>

                <div className="mb-[34px]">
                  <p className={dialogPStyle}>
                    آیا مایل به خروج از حساب کاربری خود هستید؟
                  </p>
                </div>

                <div className={dialogButtonDivStyle}>
                  <button
                    onClick={closeModal}
                    className={`${dialogButtonStyle} bg-[#417F56] border-[#417F56] text-white`}
                  >
                    بازگشت
                  </button>
                  <button
                    onClick={handleLogout}
                    className={`${dialogButtonStyle} text-[#C30000] border-[#FFF2F2] bg-[#FFF2F2]`}
                  >
                    خروج
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default SignOut;
