import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SideBar from "../SideBar";
import EmptyAddress from "./EmptyAddress";

// Icons
import { arrowRightIcon } from "../../icons/shopCartIcons";
import { trashIcon, trashDesktopIcon } from "../../icons/shopCartIcons";
import {
  addIcon,
  add2icon,
  add2DesktopIcon,
  closeIcon,
  closeDesktopIcon,
  editIcon,
  editDesktopIcon,
} from "../../icons/addressIcon";

// Styles
import { headerStyle } from "../../components/shopping-cart/ShopCart";
import {
  addressBoxStyle,
  addressTextareaStyle,
  userInfoDivStyle,
  inputNameStyle,
  inputPhoneNumberStyle,
  addAddressButtonStyle,
  ulStyle,
  liStyle,
} from "../../components/completion-of-information/Address";

const ProfileAddress = () => {
  const [list, setList] = useState([]);
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [editedIndex, setEditedIndex] = useState(-1);
  const [isCreating, setIsCreating] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [initialAddressAdded, setInitialAddressAdded] = useState(false);

  useEffect(() => {
    const storedList = JSON.parse(localStorage.getItem("addressList")) || [];
    setList(storedList);
  }, []);

  const updateAddress = (value) => {
    setAddress(value);
  };

  const updateName = (value) => {
    setName(value);
  };

  const updatePhoneNumber = (value) => {
    setPhoneNumber(value);
  };

  const addItem = () => {
    if (address !== "" && name !== "" && phoneNumber !== "") {
      const newItem = {
        id: Math.floor(Math.random() * 100),
        address: address,
        name: name,
        phoneNumber: phoneNumber,
      };

      const updatedList = [...list, newItem];

      if (!initialAddressAdded) {
        setSelectedAddressId(newItem.id);
        setInitialAddressAdded(true);
      }

      setList(updatedList);
      setAddress("");
      setName("");
      setPhoneNumber("");
      setIsCreating(false);

      localStorage.setItem("addressList", JSON.stringify(updatedList));
    }
  };

  const deleteItem = (key) => {
    const updatedList = list.filter((item) => item.id !== key);
    setList(updatedList);

    localStorage.setItem("addressList", JSON.stringify(updatedList));
  };

  const saveEditedItem = (editedValue, index) => {
    const updatedItem = [...list];
    updatedItem[index].value = editedValue;
    setList(updatedItem);
    setEditedIndex(-1);

    localStorage.setItem("addressList", JSON.stringify(updatedItem));
  };

  return (
    <div className="container max-w-[1224px] mx-auto px-5 min-h-[calc(100vh_-_239px)] md:min-h-[calc(100vh_-_430px)] md:flex md:gap-x-6">
      <div className="hidden md:block flex-1 md:max-w-[182px] lg:max-w-[248px]">
        <SideBar />
      </div>

      <div className="md:mt-10 flex-1 md:w-[400px] lg:w-[712px] md:border md:border-[#CBCBCB] md:rounded-md md:p-6 md:pb-0 md:mb-12">
        {/* Header */}
        <div
          className={`${headerStyle} md:!block !justify-center relative mt-6 md:mt-0 md:text-[22px] md:border-b md:border-[#CBCBCB] md:pb-2 `}
        >
          <Link
            to="/dashboard"
            className="absolute right-0 md:hidden"
          >
            {arrowRightIcon}
          </Link>
          <p className="pl-2">آدرس ها</p>
          <button
            onClick={() => setIsCreating(true)}
            className={
              !isCreating
                ? `${addAddressButtonStyle} !top-0.5 !left-0 font-normal text-[11px] md:text-sm`
                : "hidden"
            }
          >
            <span>{addIcon}</span>
            <span className="sm:hidden">افزودن</span>
            <span className="hidden sm:block">افزودن آدرس</span>
          </button>
        </div>

        {!list.length && !isCreating && (
          <div className="mt-5">
            <EmptyAddress />
          </div>
        )}

        {isCreating && (
          <div className={`${addressBoxStyle} !rounded-md mb-3 lg:mb-4 mt-5`}>
            <textarea
              autoFocus
              value={address}
              onChange={(e) => updateAddress(e.target.value)}
              placeholder="آدرس"
              multiple
              className={`${addressTextareaStyle} bg-white !pl-16`}
            />

            <div className={userInfoDivStyle}>
              <input
                type="text"
                value={name}
                onChange={(e) => updateName(e.target.value)}
                placeholder="نام گیرنده"
                className={`${inputNameStyle} !bg-white`}
              />

              <input
                type="number"
                value={phoneNumber}
                onChange={(e) => updatePhoneNumber(e.target.value)}
                placeholder="شماره تلفن"
                className={`${inputPhoneNumberStyle} bg-white`}
              />
            </div>

            <button onClick={addItem} className="absolute top-4 left-4 ">
              <span className="lg:hidden">{add2icon}</span>
              <span className="hidden lg:block">{add2DesktopIcon}</span>
            </button>

            <button
              onClick={() => {
                setIsCreating(false);
                setAddress("");
                setName("");
                setPhoneNumber("");
              }}
              className="absolute top-4 left-11 lg:left-12"
            >
              <span className="lg:hidden">{closeIcon}</span>
              <span className="hidden lg:block">{closeDesktopIcon}</span>
            </button>
          </div>
        )}

        <ul className={`${ulStyle} !gap-y-3 my-5 md:my-5`}>
          {list.map((item, index) => (
            <li key={item.id} className={liStyle}>
              {editedIndex === index ? (
                <div className={`${addressBoxStyle} !rounded-md bg-white`}>
                  <textarea
                    type="text"
                    value={item.address}
                    placeholder="آدرس"
                    multiple
                    onChange={(e) => {
                      const updatedItem = [...list];
                      updatedItem[index].address = e.target.value;
                      setList(updatedItem);
                    }}
                    className={`${addressTextareaStyle} bg-white`}
                  />
                  <div className={userInfoDivStyle}>
                    <input
                      type="text"
                      value={item.name}
                      placeholder="نام گیرنده"
                      onChange={(e) => {
                        const updatedItem = [...list];
                        updatedItem[index].name = e.target.value;
                        setList(updatedItem);
                      }}
                      className={`${inputNameStyle} bg-white`}
                    />
                    <input
                      type="number"
                      value={item.phoneNumber}
                      placeholder="شماره تلفن"
                      onChange={(e) => {
                        const updatedItem = [...list];
                        updatedItem[index].phoneNumber = e.target.value;
                        setList(updatedItem);
                      }}
                      className={`${inputPhoneNumberStyle} bg-white`}
                    />
                  </div>
                </div>
              ) : (
                <div
                  className={`border ${
                    selectedAddressId === item.id
                      ? "border-[#417F56]"
                      : "border-[#CBCBCB]"
                  }  rounded-md p-4`}
                  onClick={() => {
                    setSelectedAddressId(item.id);
                  }}
                >
                  <textarea
                    className={addressTextareaStyle}
                    value={item.address}
                    multiple
                    readOnly
                  />

                  <div className={userInfoDivStyle}>
                    <span className="w-1/2">{item.name}</span>
                    <span className="w-1/2 text-left"> {item.phoneNumber}</span>
                  </div>
                </div>
              )}
              <div className="absolute top-4 left-4 text-[#353535]">
                {editedIndex === index ? (
                  <button
                    onClick={() => saveEditedItem(item.value, index)}
                    className="absolute -top-[1px] left-0"
                  >
                    <span className="lg:hidden">{editIcon}</span>
                    <span className="hidden lg:block">{editDesktopIcon}</span>
                  </button>
                ) : (
                  <div className="flex items-center gap-x-3">
                    <button onClick={() => setEditedIndex(index)}>
                      <span className="lg:hidden">{editIcon}</span>
                      <span className="hidden lg:block">{editDesktopIcon}</span>
                    </button>
                    <button onClick={() => deleteItem(item.id)}>
                      <span className="lg:hidden">{trashIcon}</span>
                      <span className="hidden lg:block">
                        {trashDesktopIcon}
                      </span>
                    </button>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProfileAddress;
