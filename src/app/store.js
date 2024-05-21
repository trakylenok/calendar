import { configureStore } from "@reduxjs/toolkit";
import calendarReducer from "./slices/calendarSlice";

export const store = configureStore({
  reducer: {
    calendar: calendarReducer,
  },
});
