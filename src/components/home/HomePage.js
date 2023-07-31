import React from "react";
import Banner from "./Banner";
import BannerDesktop from "./BannerDesktop";
import HomePageMenu from "./HomePageMenu";

const HomePage = () => {
  return (
    <>
      <div className="md:hidden"><Banner /></div>
      <div className="hidden md:block"><BannerDesktop /></div>
      <HomePageMenu />
    </>
  );
};

export default HomePage;
