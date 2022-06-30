import { configureStore } from "@reduxjs/toolkit";
import placeReducer from "../slice/slice";
export default configureStore({
  reducer: {
    palce: placeReducer,
  },
});
