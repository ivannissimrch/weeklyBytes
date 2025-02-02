import { DayPicker } from "react-day-picker";
import { useEffect } from "react";

import DaysOff from "./DaysOff";
import useCalendar from "../hooks/useCalendar";

import "react-day-picker/src/style.css";

export default function Calendar({ onSelectedDaysChange, onOffDaysChange }) {
    const {
        handleDayClick,
        handleDaysOffChange,
        formatWeekdayName,
        selectedDays,
        isWithinInterval,
        offDaysDisabled,
        selectedDaysData,
        offDays,
    } = useCalendar();

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
                <p>
                    Week from {selectedDays.from.toLocaleDateString()} to {selectedDays.to.toLocaleDateString()}
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
