import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
export const fPlace = createAsyncThunk(
  "place/fPlace",
  async (initialState, thunkAPI) => {
    try {
      const res = await fetch(
        "http://localhost:4000/user/place/62c70bfef3e51889420ffdb8"
      );
      if (res.ok) {
        const data = await res.json();
        return data;
      } else {
        return thunkAPI.rejectWithValue;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue;
    }
  }
);

const placeSlice = createSlice({
  name: "palce",
  initialState: {
    favorite: [],
  },
  reducers: {},

  extraReducers: {
    [fPlace.pending]: (state, action) => {
      return {
        ...state,
      };
    },
    [fPlace.fulfilled]: (state, action) => {
      return {
        ...state,
        favorite: action.payload,
      };
    },
    [fPlace.rejected]: (state, action) => {
      return {
        ...state,
      };
    },
  },
});
export default placeSlice.reducer;
export const { addFavorite, removeFavorite } = placeSlice.actions;
