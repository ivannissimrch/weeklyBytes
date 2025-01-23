import moment from "moment";
//takes in the starting day of the week and returns an array of the days of that week (Mon-Sun)
export default function getWeekDays(weekStart) {
      const days = [];
    
      for (let i = 0; i < 7; i += 1) {
        //changes DATE data into an ISO date format STRING and keeps only yyyy-mm-dd (ex: "2025-01-23")
        days.push(moment(weekStart).add(i, "days").toDate().toISOString().slice(0, 10));
      }

      return days;
    
}