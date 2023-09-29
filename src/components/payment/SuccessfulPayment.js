import React from "react";
import paymentImg from "../../images/successful-payment.svg";
import backgroundImg from "../../images/successful-payment-Background.svg";
import { Link } from "react-router-dom";

// Functions
import { convertToFa } from "../helper/functions";

const SuccessfulPayment = () => {
  return (
    <div
      style={{ "--image-url": `url(${backgroundImg})` }}
      className="container max-w-[1224px] min-h-[calc(100vh_-_215px)] mx-auto flex flex-col justify-center items-center text-[#417F56] bg-[image:var(--image-url)] bg-cover bg-center"
    >
      <img
        src={paymentImg}
        alt="success"
        className="w-[120px] mb-6 lg:w-[256px] lg:mb-12"
      />
      <p className="font-bold md:text-lg lg:text-3xl mb-4 lg:mb-6">
        پرداخت شما با موفقیت انجام شد!
      </p>
      <p className="text-sm mb-12 lg:text-lg">
        کد رهگیری سفارش شما: {convertToFa(Math.floor(Math.random() * 100000))}
      </p>
      <Link
        to="/"
        className="text-xs sm:text-sm border border-[#417F56] bg-white py-[5px] px-3 rounded lg:text-base lg:font-medium lg:py-[7px] lg:px-[18px]"
      >
        بازگشت به صفحه اصلی
      </Link>
    </div>
  );
};

export default SuccessfulPayment;
