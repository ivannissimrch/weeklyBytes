import { WeeklyMenu } from "../components/weekly-menu/WeeklyMenu";
import { NavLink, useLoaderData } from "react-router-dom";
import { addDays, startOfWeek, parseISO, isBefore, formatISO, addMonths } from "date-fns";
import { ToastContainer, toast } from "react-toastify";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import AddIcon from "@mui/icons-material/Add";
import generatePDF from "../functions/generatePDF";
import { useEffect, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import Select from "react-select";

export default function Home() {
  const fetchDishes = useLoaderData();

  const storedWeeklyMenu = JSON.parse(
    localStorage.getItem("generatedWeeklyMenu")
  );

  const [generatedWeeklyMenuReplace, setGeneratedWeeklyMenuReplace] =
    useLocalStorage("generatedWeeklyMenu", []);

  const [updatedMenu,setUpdatedMenu] = useState()
  
  const [storedMondays, setStoredMondays] = useState([]);

  const [mondayOptions, setMondayOptions] = useState([]);

  const [displayedStartOfWeek, setDisplayedStartOfWeek] = useState(startOfWeek(new Date(), { weekStartsOn: 1 })
  );

  useEffect(() => {
    if (storedWeeklyMenu && storedWeeklyMenu.length > 0) {
      // sorts local storage date/menu objects
      const sortedDays = storedWeeklyMenu.sort(
        (a, b) =>
          Number(a.id.replace(/-/g, "")) - Number(b.id.replace(/-/g, ""))
      );
      console.log(sortedDays);

      // deletes data that is older than 3 months from local storage
      const sixMonthAgoMonday = startOfWeek(addMonths(new Date(), -3), { weekStartsOn: 1 });

      const updatedMenu = storedWeeklyMenu.filter((item) => {
        const itemDate = parseISO(item.id);
        return !isBefore(itemDate, sixMonthAgoMonday);
      });

      setUpdatedMenu(updatedMenu)
      setGeneratedWeeklyMenuReplace(updatedMenu);

      // Mondays for weeks with assigned menu data
      const mondaysData = [];
      for (let i = 0; i < updatedMenu.length - 6; i += 7) {
        mondaysData.push(parseISO(updatedMenu[i].id));
      }
      console.log(mondaysData);
      setStoredMondays(mondaysData);

      // lists out 12 past monday and 52 Mondays starting from current week for year-to-date option
      const mondayOptionsData = [];
      for (let i = 12*-7; i < 53*7; i += 7) {
        mondayOptionsData.push(
          startOfWeek(addDays(new Date(), i), { weekStartsOn: 1 })
        );
      }
      console.log(mondayOptionsData);
      const mondayOptionsObject = mondayOptionsData.map((x) => ({
        label: `Week Starting: ${formatISO(x, { representation: "date" })}`, // format to display YYYY-MM-DD
        data: x,
      }));
      console.log(mondayOptionsObject);
      setMondayOptions(mondayOptionsObject);
    } else {
      console.log("No stored weekly menu data");
    }
  }, []);

  const handleDropDown = (selected) => {
    setDisplayedStartOfWeek(selected.data);
  };

  const isDateInUpdatedMenu = (date) => {
    const formattedDate = formatISO(date, { representation: "date" });
    return updatedMenu.some((item) => item.id === formattedDate);
  }

  const modifiedMondayOptions = mondayOptions.map((x) => {
    const isInUpdatedMenu = isDateInUpdatedMenu(x.data);
  
    return {
      ...x,
      label: `${x.label} ${isInUpdatedMenu ? `\u00A0\u00A0•`: ''}`, // Append bullet point if date is in updatedMenu
    };
  });

  return (
    <div className="flex flex-col items-center w-[95%] md:w-[95%] lg:w-[80%] ">
      {!fetchDishes.error ? (
        <>
          <div className="w-full lg:w-[85%] flex flex-col-reverse md:flex-row md:justify-between  md:items-end">
            <div className="flex flex-row justify-center md:justify-start items-center md:items-baseline w-[100%] md:w-[300px] text-xs">
              <Select
              className="w-full"
                options={modifiedMondayOptions}
                value={{
                  label: `Week Starting: ${formatISO(displayedStartOfWeek, {
                    representation: "date",
                  })}`,
                  data: displayedStartOfWeek,
                }}
                onChange={handleDropDown}
                styles={{option: (provided, state) => ({
                  ...provided,
                   backgroundColor:
                   state.isFocused
                    ? "rgba(197, 233, 255, 1)"
                    : "rgb(221, 238, 248)",
                    color:"black",
                  textAlign: "left",
                  width: "100%",
                })}}
              />
            </div>
            <div className="flex flex-row justify-end md:flex-col md:items-end md:justify-center w-full lg:w-[85%]">
              <div
                onClick={() => generatePDF(displayedStartOfWeek)}
                className="md:hidden flex flex-row text-button-blue justify-center items-center w-fit border-button-blue px-1"
              >
                <FileUploadIcon fontSize="medium" className="cursor-pointer" />
              </div>
              <NavLink
                className="flex flex-row justify-center items-center bg-button-blue border-2 text-white rounded-3xl h-[36px] w-fit px-[18px] md:px-[60px] my-2 hover:bg-white hover:text-button-blue hover:border-2 hover:border-button-blue"
                to={"/GenerateMenu"}
              >
                <AddIcon fontSize="small" className="" />
                <span className="text-sm md:text-lg">Generate Menu</span>
              </NavLink>
              <div
                onClick={() => generatePDF(displayedStartOfWeek)}
                className="hidden md:flex md:flex-row md:bg-gray-500 md:border-2 md:text-white md:justify-center md:items-center md:rounded-full md:h-[36px] md:w-fit md:px-[24px] md:py-[6px] md:hover:border-2 md:hover:border-solid md:hover:border-gray-500 md:hover:bg-white md:hover:text-gray-500 md:cursor-pointer"
              >
                <span>Export Menu</span>
                <FileUploadIcon fontSize="small" className="cursor-pointer" />
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center w-full lg:w-[85%]  ">
            <ToastContainer />
            {/* Current Week menu */}
            <WeeklyMenu weekStartDay={displayedStartOfWeek} />

            {/* Upcoming Week menu */}
            <WeeklyMenu
              weekStartDay={startOfWeek(addDays(displayedStartOfWeek, 7), {
                weekStartsOn: 1,
              })}
            />
          </div>
        </>
      ) : (
        <div className="text-center italic ">{fetchDishes.error}</div>
      )}
    </div>
  );
}
