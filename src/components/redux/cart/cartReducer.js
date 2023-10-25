const initialState = {
  selectedItems: [],
  itemsCounter: 0,
  total: 0,
  checkout: false,
  purchaseHistory: [],
};

const sumItems = (items) => {
  const itemsCounter = items.reduce(
    (total, product) => total + product.quantity,
    0
  );
  const total = items.reduce(
    (total, product) => total + product.discountedPrice * product.quantity,
    0
  );
  const discount = items.reduce(
    (total, product) =>
      total + (product.price - product.discountedPrice) * product.quantity,
    0
  );
  return { itemsCounter, total, discount };
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      if (!state.selectedItems.find((item) => item.id === action.payload.id)) {
        state.selectedItems.push({
          ...action.payload,
          quantity: 1,
        });
      }
      return {
        ...state,
        selectedItems: [...state.selectedItems],
        ...sumItems(state.selectedItems),
        checkout: false,
      };

    case "REMOVE_ITEM":
      const newSelectedItems = state.selectedItems.filter(
        (item) => item.id !== action.payload.id
      );
      return {
        ...state,
        selectedItems: [...newSelectedItems],
        ...sumItems(newSelectedItems),
      };

    case "INCREASE":
      const indexI = state.selectedItems.findIndex(
        (item) => item.id === action.payload.id
      );
      state.selectedItems[indexI].quantity++;
      return {
        ...state,
        ...sumItems(state.selectedItems),
      };
    case "DECREASE":
      const indexD = state.selectedItems.findIndex(
        (item) => item.id === action.payload.id
      );
      state.selectedItems[indexD].quantity--;
      return {
        ...state,
        ...sumItems(state.selectedItems),
      };

    case "CHECKOUT":
      const newPurchase = {
        items: state.selectedItems,
        total: state.total,
        date: new Date(),
      };
      return {
        selectedItems: [],
        itemsCounter: 0,
        total: 0,
        checkout: true,
        purchaseHistory: [...state.purchaseHistory, newPurchase],
      };

    case "CLEAR":
      return {
        selectedItems: [],
        itemsCounter: 0,
        total: 0,
        checkout: false,
      };

    default:
      return state;
  }
};

export default cartReducer;
