import React from "react";
import Banner from "./Banner";
import HomePageMenu from "./HomePageMenu";
import Introduction from "./Introduction";
import Branches from "./Branches";

const HomePage = () => {
  return (
    <>
      <Banner />
      <HomePageMenu />
      <Introduction />
      <Branches />
    </>
  );
};

export default HomePage;
