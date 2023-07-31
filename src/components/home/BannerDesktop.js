import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css/autoplay";

// images
import slider from "../../images/sliderDesktop.png";
import slider2 from "../../images/slider2Desktop.png";
import slider3 from "../../images/sliderDesktop3.png";

// styles
const swiperStyle = "w-full h-[21em]";
const swiperSlideStyle =
  "text-center py-[7.75em] h-[21em] bg-[image:var(--image-url)] bg-cover bg-center";
const pStyle = "text-[#E5F2E9] font-bold md:text-3xl lg:text-4xl";
const buttonStyle =
  "bg-[#417F56] py-2 px-6 font-medium text-white lg:text-lg rounded-md mt-12";

const BannerDesktop = () => {
  return (
    <>
      <Swiper
        pagination={true}
        modules={[Pagination, Autoplay]}
        autoplay={{
          delay: 5000,
        }}
        slidesPerView={1}
        className={swiperStyle}
      >
        <SwiperSlide
          style={{ "--image-url": `url(${slider})` }}
          className={swiperSlideStyle}
        >
          <p className={pStyle}>تجربه غذای سالم و گیاهی به سبک ترخینه</p>
          <button className={buttonStyle}>سفارش آنلاین غذا</button>
        </SwiperSlide>
        <SwiperSlide
          style={{ "--image-url": `url(${slider2})` }}
          className={swiperSlideStyle}
        >
          <p className={pStyle}>طعم بی‌نظیر طبیعت!</p>
          <button className={buttonStyle}>سفارش آنلاین غذا</button>
        </SwiperSlide>
        <SwiperSlide
          style={{ "--image-url": `url(${slider3})` }}
          className={swiperSlideStyle}
        >
          <p className={pStyle}>
            لذت غذای سالم و گیاهی را با ترخینه تجربه کنید!
          </p>
          <button className={buttonStyle}>سفارش آنلاین غذا</button>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default BannerDesktop;
