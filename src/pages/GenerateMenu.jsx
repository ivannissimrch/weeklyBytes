import Calendar from "../components/Calendar.jsx";
import useGenerateMenu from "../hooks/useGenerateMenu.jsx";

export default function GenerateMenu() {
    const { handleSelectedDaysUpdate, handleOffDaysUpdate, handleGenerate, handleRegenerate } = useGenerateMenu();

    return (
        <div className="w-screen">
            <h2 className="text-center m-4">Generate Menu</h2>
            <div className="flex flex-col w-full">
                <div className="flex flex-col items-center w-full">
                    <h2 className="text-center items-center m-3">Select Date</h2>
                    <span className="text-center items-center m-2">Choose a week to generate a menu for</span>
                    <Calendar onSelectedDaysChange={handleSelectedDaysUpdate} onOffDaysChange={handleOffDaysUpdate} />
                </div>
                <div className="flex flex-row justify-center w-full">
                    <button
                        onClick={handleGenerate}
                        className="bg-blue-400 text-white rounded-3xl p-3 m-3 w-1/6 text-center  hover:bg-gray-200">
                        Generate
                    </button>
                    <button
                        onClick={handleRegenerate}
                        className="bg-blue-400 text-white rounded-3xl p-3 m-3 w-1/6 text-center  hover:bg-gray-200">
                        Regenerate
                    </button>
                </div>
            </div>
        </div>
    );
}
