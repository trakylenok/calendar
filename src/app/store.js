import { configureStore } from "@reduxjs/toolkit";
import calendarReducer from "../components/calendar/calendarSlice";

export const store = configureStore({
  reducer: {
    calendar: calendarReducer,
  },
});
