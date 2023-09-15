import React from "react";
import { useDispatch } from "react-redux";

// Actions
import { removeItem, decrease, increase } from "../redux/cart/cartAction";

// Function
import { convertToFa } from "../helper/functions";

// Icons
import { trashIcon } from "../../icons/shopCartIcons";

// Styles
const boxStyle = "flex items-center justify-between py-2 px-2";
const titleStyle = "text-[#353535] text-sm mb-1 ";
const discountedPriceStyle = "text-[#717171] text-xs flex items-center gap-x-1";
const quantityDivStyle =
  "text-[#417F56] bg-[#E5F2E9] py-1 px-[4.5px] rounded flex items-center gap-x-2 ";

const FactorCart = (props) => {
  const dispatch = useDispatch();

  const { title, discountedPrice, quantity } = props.data;

  return (
    <div className={boxStyle}>
      <div>
        <h3 className={titleStyle}>{title}</h3>
        <div className={discountedPriceStyle}>
          <span>{convertToFa(discountedPrice)}</span>
          <span>تومان</span>
        </div>
      </div>

      <div className={quantityDivStyle}>
        <button onClick={() => dispatch(increase(props.data))}>+</button>
        <span>{convertToFa(quantity)}</span>
        {quantity > 1 ? (
          <button onClick={() => dispatch(decrease(props.data))}>-</button>
        ) : (
          <button onClick={() => dispatch(removeItem(props.data))}>
            {trashIcon}
          </button>
        )}
      </div>
    </div>
  );
};

export default FactorCart;
