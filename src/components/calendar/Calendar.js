import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { previousMonth, nextMonth } from "./calendarSlice";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isToday,
  parseISO,
} from "date-fns";
import NoteModal from "./NoteModal";
import "./Calendar.css";

const daysOfWeek = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

function Calendar() {
  const dispatch = useDispatch();
  const currentDateStr = useSelector((state) => state.calendar.currentDate);
  const notes = useSelector((state) => state.calendar.notes);
  const [selectedDate, setSelectedDate] = useState(null);

  const currentDate = parseISO(currentDateStr);
  const startMonth = startOfMonth(currentDate);
  const endMonth = endOfMonth(currentDate);
  const startDate = startOfWeek(startMonth, { weekStartsOn: 1 });
  const endDate = endOfWeek(endMonth, { weekStartsOn: 1 });

  const dates = [];
  let day = startDate;

  while (day <= endDate) {
    dates.push(day);
    day = addDays(day, 1);
  }

  const handleDayClick = (date) => {
    setSelectedDate(date);
  };

  const handleCloseModal = () => {
    setSelectedDate(null);
  };

  return (
    <div className="calendar">
      <div className="header">
        <button onClick={() => dispatch(previousMonth())}>{"<"}</button>
        <div>{format(currentDate, "MMMM yyyy")}</div>
        <button onClick={() => dispatch(nextMonth())}>{">"}</button>
      </div>
      <div className="daysOfWeek">
        {daysOfWeek.map((day) => (
          <div key={day} className="day">
            {day}
          </div>
        ))}
      </div>
      <div className="dates">
        {dates.map((date) => (
          <div
            key={date}
            className={`date ${isToday(date) ? "today" : ""} ${
              date.getMonth() !== currentDate.getMonth()
                ? "notCurrentMonth"
                : ""
            } ${notes[format(date, "yyyy-MM-dd")] ? "hasNotes" : ""}`}
            onClick={() => handleDayClick(format(date, "yyyy-MM-dd"))}
            title={notes[format(date, "yyyy-MM-dd")]?.join(", ") || ""}
          >
            {format(date, "d")}
          </div>
        ))}
      </div>
      {selectedDate && (
        <NoteModal date={selectedDate} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default Calendar;
