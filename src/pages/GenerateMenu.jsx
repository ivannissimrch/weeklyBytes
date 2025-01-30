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

  const [generatedWeeklyMenuReplace, setGeneratedWeeklyMenuReplace] =
    useLocalStorage("generatedWeeklyMenu", []);
  const [generatedWeeklyMenuAdd, setGeneratedWeeklyMenuAdd] = addToLocalStorage(
    "generatedWeeklyMenu",
    []
  );
  const storedWeeklyMenu = JSON.parse(
    localStorage.getItem("generatedWeeklyMenu")
  );

  const handleGenerate = () => {
    if (storedWeeklyMenu) {
      if (storedWeeklyMenu.find((x) => x.id === selectedDaysFromCalendar[0])) {
        alert("This week has already been generated");
      } else {
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
      if (storedWeeklyMenu.find((x) => x.id === selectedDaysFromCalendar[0])) {
        const updatedStoredWeeklyMenu = storedWeeklyMenu.filter(
          (x) => !selectedDaysFromCalendar.includes(x.id)
        );
        setGeneratedWeeklyMenuReplace(updatedStoredWeeklyMenu);

        const combinedArray = selectedDaysFromCalendar.map((date, index) => ({
            id: date,
            off: offDaysFromCalendar[index] || false,
            menu: menuDishes[index] || null,
          }));
  
          console.log(storedWeeklyMenu);
          setGeneratedWeeklyMenuAdd(combinedArray);

          alert("Menu regenerated")
        
      } else {
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
