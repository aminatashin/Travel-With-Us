import { createSlice } from "@reduxjs/toolkit";

const placeSlice = createSlice({
  name: "palce",
  initialState: {
    favorite: [],
  },
  reducers: {
    addFavorite: (state, action) => {
      return {
        ...state,
        favorite: [...state.favorite, action.payload],
      };
    },
    removeFavorite: (state, action) => {
      return {
        favorite: state.favorite.filter((place, i) => i !== action.payload),
      };
    },
  },
});
export default placeSlice.reducer;
export const { addFavorite, removeFavorite } = placeSlice.actions;
