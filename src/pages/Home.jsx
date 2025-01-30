import { WeeklyMenu } from "../components/weekly-menu/WeeklyMenu";
import { NavLink } from "react-router-dom";
import { addDays, startOfWeek } from 'date-fns';

export default function Home() {



    return (
        <div className="flex flex-col items-center">
            <div className="flex flex-row w-full justify-end">
                <NavLink
                    className="bg-blue-400 text-white rounded-3xl p-3 m-3 w-1/6 text-center  hover:bg-gray-200"
                    to={"/GenerateMenu"}>
                    + Generate Menu
                </NavLink>
            </div>


            <div className="flex flex-col gap-10">
                {/* Current Week menu */}
                <WeeklyMenu weekStartDay={startOfWeek(new Date(), { weekStartsOn: 1 })} />

                {/* Upcoming Week menu */}
                <WeeklyMenu weekStartDay={startOfWeek(addDays(new Date(), 7), { weekStartsOn: 1 })} />
            </div>
        </div>
    );
}
