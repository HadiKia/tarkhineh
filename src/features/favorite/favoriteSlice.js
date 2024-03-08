import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedItems: [],
};

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    likeItem: (state, action) => {
      if (!state.selectedItems.find((i) => i.id === action.payload.id)) {
        state.selectedItems.push({ ...action.payload });
      }
    },
    disLikeItem: (state, action) => {
      const newSelectedItems = state.selectedItems.filter(
        (i) => i.id !== action.payload.id
      );
      state.selectedItems = newSelectedItems;
    },
  },
});

export default favoriteSlice.reducer;
export const { likeItem, disLikeItem } = favoriteSlice.actions;
