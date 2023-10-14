import React, { useEffect, useState } from "react";
import emptyPage from "../../images/empty-page.svg";

// Icons
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
export const addressBoxStyle =
  "border border-[#CBCBCB] rounded p-4 relative lg:rounded-lg";
export const addressTextareaStyle =
  "bg-[#F9F9F9] w-full outline-none resize-none scroll-smooth placeholder:text-[#717171] text-[#353535] text-[13px] mb-1 pl-[52px] lg:text-base";
export const userInfoDivStyle =
  "flex items-center justify-center text-[13px] text-[#717171] lg:text-sm";
export const inputNameStyle = "w-1/2 outline-none bg-[#F9F9F9]";
export const inputPhoneNumberStyle =
  "w-1/2 outline-none text-left placeholder:text-right bg-[#F9F9F9] duration-300";
export const addAddressButtonStyle =
  "absolute top-4 left-4 text-[#417F56] flex items-center";
const nullBoxStyle = "flex items-center justify-center -m-1";
const nullBoxBackgroundStyle =
  "bg-[image:var(--image-url)] bg-cover bg-center w-[131px] h-[127px] flex items-center justify-center";
const nullBoxPStyle =
  "text-[11px] absolute left-0 right-0 top-[60%] text-center font-medium text-[#757575] md:text-sm";
export const ulStyle = "flex flex-col gap-y-2 lg:grid lg:grid-cols-2 lg:gap-4";
export const liStyle = "relative bg-[#F9F9F9] lg:w-full";

const Address = ({ list, setList, updateShippingCost }) => {
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

    if (storedList.length > 0) {
      const initialAddressId = storedList[0].id;
      setSelectedAddressId(initialAddressId);
    }

    list && updateShippingCost(39000);
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

      setList([...list, newItem]);
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
    <>
      {isCreating ? (
        <div className={`${addressBoxStyle} mb-2 bg-[#F9F9F9] lg:mb-4`}>
          <textarea
            autoFocus
            value={address}
            onChange={(e) => updateAddress(e.target.value)}
            placeholder="آدرس"
            multiple
            className={`${addressTextareaStyle} !pl-16`}
          />

          <div className={userInfoDivStyle}>
            <input
              type="text"
              value={name}
              onChange={(e) => updateName(e.target.value)}
              placeholder="نام گیرنده"
              className={inputNameStyle}
            />

            <input
              type="number"
              value={phoneNumber}
              onChange={(e) => updatePhoneNumber(e.target.value)}
              placeholder="شماره تلفن"
              className={inputPhoneNumberStyle}
            />
          </div>

          <button onClick={addItem} className={`${addAddressButtonStyle}`}>
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
      ) : (
        <button
          onClick={() => setIsCreating(true)}
          className={`${addAddressButtonStyle} text-xs sm:text-sm`}
        >
          <span>{addIcon}</span>
          <span>افزودن آدرس</span>
        </button>
      )}
      {list.length === 0 && !isCreating && (
        <div className={nullBoxStyle}>
          <div
            style={{ "--image-url": `url(${emptyPage})` }}
            className={nullBoxBackgroundStyle}
          >
            <p className={nullBoxPStyle}>
              شما در حال حاضر هیچ آدرسی ثبت نکرده‌اید!
            </p>
          </div>
        </div>
      )}
      <ul className={ulStyle}>
        {list.map((item, index) => (
          <li key={item.id} className={liStyle}>
            {editedIndex === index ? (
              <div className={addressBoxStyle}>
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
                  className={addressTextareaStyle}
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
                    className={inputNameStyle}
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
                    className={inputPhoneNumberStyle}
                  />
                </div>
              </div>
            ) : (
              <div
                className={`border ${
                  selectedAddressId === item.id
                    ? "border-[#417F56]"
                    : "border-[#CBCBCB]"
                }  rounded p-4 lg:rounded-lg`}
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
                    <span className="hidden lg:block">{trashDesktopIcon}</span>
                  </button>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Address;
