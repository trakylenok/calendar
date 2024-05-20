import { createSlice } from "@reduxjs/toolkit";
import { subMonths, addMonths } from "date-fns";

const initialState = {
  currentDate: new Date(),
  notes: {},
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    previousMonth(state) {
      state.currentDate = subMonths(state.currentDate, 1);
    },
    nextMonth(state) {
      state.currentDate = addMonths(state.currentDate, 1);
    },
    addNote(state, action) {
      const { date, note } = action.payload;
      if (!state.notes[date]) {
        state.notes[date] = [];
      }
      state.notes[date].push(note);
    },
  },
});

export const { previousMonth, nextMonth, addNote } = calendarSlice.actions;
export default calendarSlice.reducer;
