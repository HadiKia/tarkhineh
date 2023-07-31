import React, { useState } from "react";

// styles
const burger = "h-[0.094em] w-[1.219em] bg-[#417F56] rounded-md duration-500";
const mobileMenu = "absolute top-[4em] left-0 right-0 h-screen duration-700 z-10";
const ulStyle= "text-right pt-6 flex flex-col gap-y-4 h-screen bg-white w-60"
const liStyle = "text-[#417F56] py-2 px-[1.5em]"

const Hamburger = () => {
  const open = true;
  const [menu, setMenu] = useState(open);

  const openMenu = () => {
    setMenu(!menu);
  };

  return (
    <>
      <div onClick={openMenu} className="flex flex-col gap-y-[0.219em]">
        <span
          className={menu ? burger : `${burger} -rotate-45 translate-y-1.5`}
        ></span>
        <span
          className={menu ? burger : `${burger} translate-x-full opacity-0`}
        ></span>
        <span
          className={menu ? burger : `${burger} rotate-45 -translate-y-1`}
        ></span>
      </div>

      <div
       onClick={openMenu}
        className={ menu ? `${mobileMenu} translate-x-full` : `${mobileMenu} translate-x-0`
        }
      >
        <ul className={ulStyle}>
          <li onClick={openMenu} className={liStyle}>صفحه اصلی</li>
          <li onClick={openMenu} className={liStyle}>شعبه</li>
          <li onClick={openMenu} className={liStyle}>منو</li>
          <li onClick={openMenu} className={liStyle}>اعطای نمایندگی</li>
          <li onClick={openMenu} className={liStyle}>درباره ما</li>
          <li onClick={openMenu} className={liStyle}>تماس با ما</li>
        </ul>
      </div>
    </>
  );
};

export default Hamburger;
