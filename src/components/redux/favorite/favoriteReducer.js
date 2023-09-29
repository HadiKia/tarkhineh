const initialState = {
  selectedItems: [],
};

const favoriteReducer = (state = initialState, action) => {
    switch(action.type) {
        case "LIKE_ITEM":
      if (!state.selectedItems.find((item) => item.id === action.payload.id)) {
        state.selectedItems.push({
          ...action.payload,
        });
      }
      return {
        ...state,
        selectedItems: [...state.selectedItems],
      };

    case "DISLIKE_ITEM":
      const newSelectedItems = state.selectedItems.filter(
        (item) => item.id !== action.payload.id
      );
      return {
        ...state,
        selectedItems: [...newSelectedItems],
      }

      default:
        return state;
    }
}

export default favoriteReducer