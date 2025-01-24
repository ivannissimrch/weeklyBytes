import React, { useState } from "react";
import moment from "moment";
import {DayPicker} from "react-day-picker";
import getWeekDays from "../functions/getWeekDays.js";


//returns an object with the start and end of a week by looking at the date selected
function getWeekRange(date) {
  return {
    from: moment(date).startOf("isoWeek").toDate(),
    to: moment(date).endOf("isoWeek").toDate(),
  };
}

export default function Calendar({onSelectedDaysChange}) {
  const [hoverRange, setHoverRange] = useState(undefined);
  const [selectedDays, setSelectedDays] = useState([]);

  //takes in selected date to obtain array from getWeekDays to be raised to GenerateMenu
  const handleDayChange = (date) => {
    setSelectedDays(getWeekDays(getWeekRange(date).from));
    onSelectedDaysChange(getWeekDays(getWeekRange(date).from))
    console.log(getWeekDays(getWeekRange(date).from))
  };

  const handleDayEnter = (date) => {
    setHoverRange(getWeekRange(date));
  };

  const handleDayLeave = () => {
    setHoverRange(undefined);
  };


  const daysAreSelected = selectedDays.length > 0;

  //TO-DO understand this
  const modifiers = {
    hoverRange,
    selectedRange: daysAreSelected && {
      from: selectedDays[0],
      to: selectedDays[6],
    },
    hoverRangeStart: hoverRange && hoverRange.from,
    hoverRangeEnd: hoverRange && hoverRange.to,
    selectedRangeStart: daysAreSelected && selectedDays[0],
    selectedRangeEnd: daysAreSelected && selectedDays[6],
  };

  return (
    <div className="w-1/3 space-y-4 p-4 bg-gray-100 rounded-lg shadow">
      <DayPicker
        weekStartsOn={1}
        //disabled={{ before: new Date() }}
        selectedDays={selectedDays}
        showOutsideDays={false}
        modifiers={modifiers}
        onDayClick={handleDayChange}
        onDayMouseEnter={handleDayEnter}
        onDayMouseLeave={handleDayLeave}
        className=" w-full border border-gray-300 rounded-lg bg-white flex flex-row justify-center"
      />
      {selectedDays.length === 7 && (
        <div className="text-center text-lg font-medium text-gray-800">
          {moment(selectedDays[0]).format("LL")} –{" "}
          {moment(selectedDays[6]).format("LL")}
        </div>
      )}
      
    </div>
  );
}
