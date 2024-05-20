import React from "react";
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
} from "date-fns";
import "./Calendar.css";

const daysOfWeek = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

function Calendar() {
  const dispatch = useDispatch();
  const currentDate = useSelector((state) => state.calendar.currentDate);

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
            }`}
          >
            {format(date, "d")}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Calendar;
