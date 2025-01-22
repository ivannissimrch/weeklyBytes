import { WeeklyMenu } from "../components/weekly-menu/WeeklyMenu";

export default function Home() {
    return (
        <>
            <button className="flex items-center ml-auto bg-slate-300 hover:bg-slate-200 text-black my-5 py-2 px-6 rounded-full">
                <span className="mr-3">+</span> Generate Menu
            </button>
            {localStorage.getItem("safeDishes") ? (
                <div className="flex flex-col gap-10">
                    {/* Current Week menu */}
                    <WeeklyMenu week={"current"} />

                    {/* Upcoming Week menu */}
                    <WeeklyMenu week={"upcoming"} />
                </div>
            ) : (
                <p className="text-center">Set employee allergies before continuing</p>
            )}
        </>
    );
}
