import { useState, useEffect } from "react";
import {
  endOfWeek,
  startOfWeek,
  isWithinInterval,
  addDays,
  eachDayOfInterval,
  formatISO9075,
  format,
} from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/src/style.css";
import DaysOff from "./DaysOff";

// used for producing dates in ISO format to be used as id
const cleanUpDates = (days) => {
  const cleanedUpDays = [];
  for (let i = 0; i < 7; i += 1) {
    cleanedUpDays.push(formatISO9075(days[i], { representation: "date" }));
  }
  return cleanedUpDays;
};

export default function Calendar({ onSelectedDaysChange, onOffDaysChange }) {
  // defaults highlighted week to next week
  const [selectedDays, setSelectedDays] = useState({
    from: startOfWeek(addDays(new Date(), 7), { weekStartsOn: 1 }),
    to: endOfWeek(addDays(new Date(), 7), { weekStartsOn: 1 }),
  });

  // produces array of dates in ISO format to be used as id
  const [selectedDaysData, setSelectedDaysData] = useState(
    cleanUpDates(
      eachDayOfInterval({
        start: startOfWeek(addDays(new Date(), 7), { weekStartsOn: 1 }),
        end: endOfWeek(addDays(new Date(), 7), { weekStartsOn: 1 }),
      })
    )
  );

  const handleDayClick = (day) => {
    if (
      selectedDays &&
      isWithinInterval(day, { start: selectedDays.from, end: selectedDays.to })
    ) {
      setSelectedDays(null); // Clear selection if clicking within the selected week
    } else {
      // used by modifier
      setSelectedDays({
        from: startOfWeek(day, { weekStartsOn: 1 }),
        to: endOfWeek(day, { weekStartsOn: 1 }),
      });
      // used for data
      setSelectedDaysData(
        cleanUpDates(
          eachDayOfInterval({
            start: startOfWeek(day, { weekStartsOn: 1 }),
            end: endOfWeek(day, { weekStartsOn: 1 }),
          })
        )
      );
    }
  };

  const formatWeekdayName = (day) => format(day, "ccc");

  // default off days
  const [offDays, setOffDays] = useState([
    false,
    false,
    false,
    false,
    false,
    true,
    true,
  ]);
  const [offDaysDisabled, setOffDaysDisabled] = useState([6, 0]);

  const handleDaysOffChange = (offDaysArray) => {
    setOffDays(offDaysArray);
  };

  // updates the disabled weekdays
  useEffect(() => {
    setOffDaysDisabled(
      offDays.flatMap((x, index) =>
        x ? (index + 1 === 7 ? 0 : index + 1) : []
      )
    );
  }, [offDays]);

  // console logs dates when week is clicked
  useEffect(() => {
    console.log(selectedDaysData);
    console.log(offDays);
  }, [selectedDaysData, offDays]);

  // raises selectedDaysData, offDays to Generate Menu
  useEffect(() => {
    onSelectedDaysChange(selectedDaysData);
    onOffDaysChange(offDays);
  }, [selectedDaysData, offDays]);

  return (
    <div className="flex flex-col items-center">
      <DayPicker
        numberOfMonths={2}
        weekStartsOn={1}
        captionLayout={"dropdown"}
        selected={selectedDays}
        formatters={{ formatWeekdayName }}
        modifiers={{
          range_start: selectedDays?.from,
          range_end: selectedDays?.to,
          range_middle: (date) =>
            selectedDays
              ? isWithinInterval(date, {
                  start: selectedDays.from,
                  end: selectedDays.to,
                })
              : false,
        }}
        disabled={[{ dayOfWeek: offDaysDisabled }, { before: new Date() }]}
        onDayClick={handleDayClick}
      />
      {selectedDays && (
        <p className="w-full bg-white text-center p-2">
          Week from {selectedDays.from.toLocaleDateString()} to{" "}
          {selectedDays.to.toLocaleDateString()}
        </p>
      )}
      <DaysOff onDaysOffChange={handleDaysOffChange} />

      <style>
        {`
            .rdp-root {
                --rdp-accent-color: #DDEEF8;
                --rdp-outside-opacity: 0.35; 
                --rdp-today-color: blue;
                --rdp-range_start-color: black;
                --rdp-range_start-background: #DDEEF8;
                --rdp-range_start-date-background-color: #DDEEF8;
                --rdp-range_end-color: black;
                --rdp-range_end-background: #DDEEF8;
                --rdp-range_end-date-background-color: #DDEEF8;
                --rdp-range_middle-background-color: #ddeef8;
                background-color: white;
                padding: 5px
                
            }
            .rdp-months {
              position: relative;
              display: flex;
              flex-flow: row wrap;
              gap: var(--rdp-months-gap);
              max-width: fit-content;
            }
            .rdp-chevron {
              fill: blue;
            }
          }
        `}
      </style>
    </div>
  );
}
