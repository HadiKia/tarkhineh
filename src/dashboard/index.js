import React, { useEffect } from "react";
import SideBar from "./SideBar";

const Dashboard = () => {
  useEffect(() => {
    document.title = "پنل کاربری";
  }, []);

  return (
    <div className="container max-w-[1224px] mx-auto px-5 min-h-[calc(100vh_-_239px)] md:min-h-[calc(100vh_-_466px)]">
      <div className="md:max-w-[182px] lg:max-w-[248px]">
        <SideBar />
      </div>
    </div>
  );
};

export default Dashboard;
