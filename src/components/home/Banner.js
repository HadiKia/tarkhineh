import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import 'swiper/css/autoplay'

// images
import slider from '../../images/slider.png'
import slider2 from '../../images/slider2.png'
import slider3 from '../../images/slider3.png'

// styles
const swiperStyle = 'w-full h-[11em]'
const swiperSlideStyle = 'text-center py-[4.813em] h-[11em] bg-[image:var(--image-url)] bg-cover bg-center'
const pStyle = 'text-[#E5F2E9] font-bold'
const buttonStyle = 'bg-[#417F56] py-1.5 px-3 text-[10px] font-medium text-white rounded-md mt-3.5'

const Banner = () => {
 
  return (
    <>
      <Swiper  pagination={true} modules={[Pagination, Autoplay]} autoplay={true} className={swiperStyle}>
        <SwiperSlide style={{ "--image-url": `url(${slider})` }} className={swiperSlideStyle}>
          <p className={pStyle}>تجربه غذای سالم و گیاهی به سبک ترخینه</p>
          <button className={buttonStyle}>سفارش آنلاین غذا</button>
        </SwiperSlide>
        <SwiperSlide style={{ "--image-url": `url(${slider2})` }} className={swiperSlideStyle}>
          <p className={pStyle}>طعم بی‌نظیر طبیعت!</p>
          <button className={buttonStyle}>سفارش آنلاین غذا</button>
        </SwiperSlide>
        <SwiperSlide style={{ "--image-url": `url(${slider3})` }} className={swiperSlideStyle}>
          <p className={pStyle}>لذت غذای سالم و گیاهی را با ترخینه تجربه کنید!</p>
          <button className={buttonStyle}>سفارش آنلاین غذا</button>
        </SwiperSlide>
        
      </Swiper>
    </>
  );
};

export default Banner;
