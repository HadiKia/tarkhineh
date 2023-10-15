import React, { useEffect } from "react";
import bannerImg from "../../images/franchise-banner.jpg";

// Styles
import { bannerImgStyle, bannerTitleStyle } from "../about-us/AboutUs";

const Franchise = () => {
  useEffect(() => {
    document.title = "اعطای نمایندگی";
  }, []);

  return (
    <div>
      <div
        style={{ "--image-url": `url(${bannerImg})` }}
        className={bannerImgStyle}
      >
        <span className={bannerTitleStyle}>
          همین الان به خانواده بزرگ ترخینه بپیوندید!
        </span>
      </div>
    </div>
  );
};

export default Franchise;
