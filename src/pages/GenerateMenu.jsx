import Calendar from "../components/Calendar.jsx";
import { useState, useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage.js";
import { useLoaderData } from "react-router-dom";
import { addToLocalStorage } from "../hooks/addToLocalStorage.js";
import useGenerateWeeklyDishes from "../hooks/useGenerateWeeklyDishes.js";

export default function GenerateMenu() {
  const [selectedDaysFromCalendar, setSelectedDaysFromCalendar] = useState([]);
  const [offDaysFromCalendar, setOffDaysFromCalendar] = useState([]);
  const [menuDishes, setMenuDishes] = useGenerateWeeklyDishes();

  const handleSelectedDaysUpdate = (dataArray) => {
    setSelectedDaysFromCalendar(dataArray);
  };

  const handleOffDaysUpdate = (dataArray) => {
    setOffDaysFromCalendar(dataArray);
  };

  useEffect(() => {
    // Temporary -- generates a menu on mount
    setMenuDishes();
  }, [selectedDaysFromCalendar, offDaysFromCalendar]);

  // Replaces local storage
  const [generatedWeeklyMenuReplace, setGeneratedWeeklyMenuReplace] =
    useLocalStorage("generatedWeeklyMenu", []);

  // Adds to local storage
  const [generatedWeeklyMenuAdd, setGeneratedWeeklyMenuAdd] = addToLocalStorage(
    "generatedWeeklyMenu",
    []
  );

  const storedWeeklyMenu = JSON.parse(
    localStorage.getItem("generatedWeeklyMenu")
  );

  const handleGenerate = () => {
    // (Generate) if local storage is already populated
    if (storedWeeklyMenu) {
        // (Generate) if a week already has a menu
      if (storedWeeklyMenu.find((x) => x.id === selectedDaysFromCalendar[0])) {
        alert("This week has already been generated");
      } else {
        // (Generate) combines dates, off-days, safe-dishes into objects
        const combinedArray = selectedDaysFromCalendar.map((date, index) => ({
          id: date,
          off: offDaysFromCalendar[index] || false,
          menu: menuDishes[index] || null,
        }));

        console.log(storedWeeklyMenu);
        setGeneratedWeeklyMenuAdd(combinedArray);

        alert("Menu Generated")
      }
    } else {
        // (Generate) combines dates, off-days, safe-dishes into objects
      const combinedArray = selectedDaysFromCalendar.map((date, index) => ({
        id: date,
        off: offDaysFromCalendar[index] || false,
        menu: menuDishes[index] || null,
      }));

      setGeneratedWeeklyMenuAdd(combinedArray);
      console.log(storedWeeklyMenu);

      alert("Menu Generated")
    }
  };

  const handleRegenerate = () => {
    const userConfirm = confirm(
      "Are you sure you want to regenerate the menu?"
    );

    if (userConfirm) {
        // (Regenerate) if selected week already has generated menu
      if (storedWeeklyMenu.find((x) => x.id === selectedDaysFromCalendar[0])) {
        // (Regenerate) deletes selected week from local storage
        const updatedStoredWeeklyMenu = storedWeeklyMenu.filter(
          (x) => !selectedDaysFromCalendar.includes(x.id)
        );
        setGeneratedWeeklyMenuReplace(updatedStoredWeeklyMenu);

        // combines dates, off-days, safe-dishes into objects
        const combinedArray = selectedDaysFromCalendar.map((date, index) => ({
            id: date,
            off: offDaysFromCalendar[index] || false,
            menu: menuDishes[index] || null,
          }));
  
          console.log(storedWeeklyMenu);
          setGeneratedWeeklyMenuAdd(combinedArray);

          alert("Menu regenerated")
        
      } else {
        // (Regenerate) if selected week DO NOT have a generated menu
        alert("Selected week's menu has not been generated yet");
      }
    } else {
      return;
    }
  };

  return (
    <div className="w-screen">
      <h2 className="text-center m-4">Generate Menu</h2>
      <div className="flex flex-col w-full">
        <div className="flex flex-col items-center w-full">
          <h2 className="text-center items-center m-3">Select Date</h2>
          <span className="text-center items-center m-2">
            Choose a week to generate a menu for
          </span>
          <Calendar
            onSelectedDaysChange={handleSelectedDaysUpdate}
            onOffDaysChange={handleOffDaysUpdate}
          />
        </div>
        <div className="flex flex-row justify-center w-full">
          <button
            onClick={handleGenerate}
            className="bg-blue-400 text-white rounded-3xl p-3 m-3 w-1/6 text-center  hover:bg-gray-200"
          >
            Generate
          </button>
          <button
            onClick={handleRegenerate}
            className="bg-blue-400 text-white rounded-3xl p-3 m-3 w-1/6 text-center  hover:bg-gray-200"
          >
            Regenerate
          </button>
        </div>
      </div>
    </div>
  );
}
