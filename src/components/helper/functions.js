const convertToFa = (number) => {
  const persian = {
    0: "۰",
    1: "۱",
    2: "۲",
    3: "۳",
    4: "۴",
    5: "۵",
    6: "۶",
    7: "۷",
    8: "۸",
    9: "۹",
  };

  const numberWithCommas = number
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  let persianNumber = "";

  for (let i = 0; i < numberWithCommas.length; i++) {
    if (numberWithCommas[i] === ",") {
      persianNumber += numberWithCommas[i];
    } else {
      persianNumber += persian[numberWithCommas[i]];
    }
  }

  return persianNumber;
};

const enToFa = (number) => {
  const persian = {
    0: "۰",
    1: "۱",
    2: "۲",
    3: "۳",
    4: "۴",
    5: "۵",
    6: "۶",
    7: "۷",
    8: "۸",
    9: "۹",
  };

  const numberString = number.toString();
  let persianNumber = "";

  for (let i = 0; i < numberString.length; i++) {
    persianNumber += persian[numberString[i]];
  }

  return persianNumber;
};

const isInCart = (state, id) => {
  const result = !!state.selectedItems.find((item) => item.id === id);
  return result;
};

const isInFavorite = (state, id) => {
  const result = !!state.selectedItems.find((item) => item.id === id);
  return result;
};

const quantityCount = (state, id) => {
  const index = state.selectedItems.findIndex((item) => item.id === id);
  if (index === -1) {
    return false;
  } else {
    return state.selectedItems[index].quantity;
  }
};

export { convertToFa, enToFa, isInCart, isInFavorite, quantityCount };
