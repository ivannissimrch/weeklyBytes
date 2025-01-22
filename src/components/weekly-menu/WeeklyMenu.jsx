import { DayCard } from "./DayCard";
import useGenerateWeeklyDishes from "../../hooks/useGenerateWeeklyDishes";

export function WeeklyMenu({ week }) {
  const currentWeekDishes = useGenerateWeeklyDishes(); // custom hook used to generate/randomize weekly dishes
  const days = ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"]; // temp data for days of week

  return (
    <>
      <div className="gap-14 bg-slate-100 p-6">
        <h2 className="text-center my-8">
          {week === "current" ? "This" : "Upcoming"} Week&apos;s Menu
        </h2>
        <div className="grid grid-cols-4 gap-6">
          {Array.from(currentWeekDishes).map((dish, i) => (
            <DayCard key={i} dish={dish} day={days[i]} />
          ))}
        </div>
      </div>
    </>
  );
}
