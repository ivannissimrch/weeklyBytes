/* eslint-disable react/prop-types -- bypass proptypes error */
import { DayCard } from "./DayCard";
import { formatISO9075, addDays, format } from "date-fns";
import { useState, useEffect } from "react";

//looks at today's date and produce an array of days of the current week
function getWeekLabels(weekStart) {
    const days = [];

    for (let i = 0; i < 7; i += 1) {
        //changes DATE data into a STRING and removes time data (ex: "Mon Jan 20 2025")
        days.push(format(addDays(weekStart, i), "EEE MMM-dd-yyyy"));
    }

    return days;
}

function getWeekDays(weekStart) {
    const days = [];

    for (let i = 0; i < 7; i += 1) {
        //changes DATE data into an ISO date format STRING and keeps only yyyy-mm-dd (ex: "2025-01-23")
        days.push(formatISO9075(addDays(weekStart, i), { representation: "date" }));
    }

    return days;
}

export function WeeklyMenu({ weekStartDay }) {
    const [currentWeekDaysLabels, setCurrentWeekDaysLabels] = useState([]);
    const [currentWeekDays, setCurrentWeekDays] = useState([]);
    const [initialReady, setInitialReady] = useState([false]);

    // populates currentWeekDaysLabels and currentWeekDays at component render
    useEffect(() => {
        setCurrentWeekDaysLabels(getWeekLabels(weekStartDay));
        setCurrentWeekDays(getWeekDays(weekStartDay));
        setInitialReady(true);
    }, []);

    const storedWeeklyMenu = JSON.parse(localStorage.getItem("generatedWeeklyMenu"));

    const [daysObjectsFromStorage, setDaysObjectsFromStorage] = useState([]);

    // runs only after initial useEffect due to dependancy
    // runs only if local storage is NOT empty
    useEffect(() => {
        if (initialReady && storedWeeklyMenu !== null) {
            const updatedStoredWeeklyMenu = storedWeeklyMenu.filter((x) => currentWeekDays.includes(x.id));

            const daysObjects = [];

            for (let i = 0; i < 7; i += 1) {
                daysObjects.push(updatedStoredWeeklyMenu.find((x) => x.id === currentWeekDays[i]));
            }

            setDaysObjectsFromStorage(daysObjects);
        }
    }, [initialReady]);

    return (
        <>
            <div className="gap-14 bg-slate-100 p-6">
                <h2 className="text-center my-8">
                    {getWeekDays(weekStartDay).includes(formatISO9075(new Date(), { representation: "date" }))
                        ? "This"
                        : "Upcoming"}{" "}
                    Week&apos;s Menu
                </h2>
                <button onClick={() => console.log(currentWeekDays)}>test</button>
                <div className="grid grid-cols-4 gap-6">
                    {Array.from(daysObjectsFromStorage.length > 0 ? daysObjectsFromStorage : currentWeekDaysLabels).map(
                        (object, i) => (
                            <DayCard
                                key={i}
                                data={object !== undefined ? object : undefined}
                                placeholder={"Menu Not Generated"}
                                day={currentWeekDaysLabels[i]}
                            />
                        )
                    )}
                </div>
            </div>
        </>
    );
}
