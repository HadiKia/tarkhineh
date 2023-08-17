import React, { useEffect } from "react";
import Banner from "../shared/Banner";
import HomePageMenu from "./HomePageMenu";
import Introduction from "./Introduction";
import Branches from "./Branches";

const HomePage = () => {
  useEffect(()=> {
    document.title = "ترخینه | فروش غذا";
  }, [])

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
