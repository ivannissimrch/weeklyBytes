import { WeeklyMenu } from "../components/weekly-menu/WeeklyMenu";
import { NavLink } from "react-router-dom";
import moment from "moment";


export default function Home() {
    return (
        <div className="flex flex-col items-center">
            <div className="flex flex-row w-full justify-end">
                <NavLink className="bg-blue-400 rounded-3xl p-3 m-3 w-1/6 text-center  hover:bg-gray-200" to={"/GenerateMenu"}>+ Generate Menu</NavLink>
            </div>
            {localStorage.getItem("safeDishes") ? (
                <div className="flex flex-col gap-10">
                    {/* Current Week menu */}
                    <WeeklyMenu weekStartDay={moment().startOf('isoWeek')} />

                    {/* Upcoming Week menu */}
                    <WeeklyMenu weekStartDay={moment().add(7,"days").startOf('isoWeek')} />
                </div>
            ) : (
                <p className="text-center">Set employee allergies before continuing</p>
            )}
        </div>
    );
}
