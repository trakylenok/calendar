import { createSlice } from "@reduxjs/toolkit";
import { format, addMonths, parseISO } from "date-fns";
import { createSelector } from "reselect";

const formatDate = (date) => format(date, "yyyy-MM-dd");

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("calendarState");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("calendarState", serializedState);
  } catch (err) {
    console.log('Error', err)
  }
};

const initialState = loadState() || {
  currentDate: formatDate(new Date()),
  notes: {},
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    previousMonth(state) {
      const date = parseISO(state.currentDate);
      state.currentDate = formatDate(addMonths(date, -1));
    },
    nextMonth(state) {
      const date = parseISO(state.currentDate);
      state.currentDate = formatDate(addMonths(date, 1));
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

const selectNotes = (state) => state.calendar.notes;

export const selectNotesByDate = createSelector(
    [selectNotes, (state, date) => formatDate(parseISO(date))],
    (notes, formattedDate) => notes[formattedDate] || []
);

const calendarReducer = calendarSlice.reducer;

const rootReducer = (state, action) => {
  const newState = calendarReducer(state, action);
  saveState(newState);
  return newState;
};

export default rootReducer;
