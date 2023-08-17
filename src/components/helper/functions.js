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

export { convertToFa };
