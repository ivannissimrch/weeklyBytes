import { WeeklyMenu } from "../components/weekly-menu/WeeklyMenu";
import { NavLink } from "react-router-dom";
import { addDays, startOfWeek } from 'date-fns';
import { useEffect } from "react";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import moment from "moment";
import useGenerateWeeklyDishes from "../hooks/useGenerateWeeklyDishes";
import jsPDF from "jspdf";
import { Slide, ToastContainer, toast } from "react-toastify";


export default function Home() {



    const downloadMenuPDF = () => {
        const showSuccess = () =>
            toast.success("Your menu is downloading!", {
                theme: "colored",
            });
        const showError = () =>
            toast.error("There was an error. Please try again!", {
                theme: "colored",
            });
        try {
            const doc = new jsPDF();
            doc.setFont("helvetica", "bold");
            doc.setFontSize(16);
            doc.text("Weekly Menu", 16, 20);

            const formatMenuData = (weekData, title, yOffset) => {
                doc.setFont("helvetica", "bolditalic");
                doc.setFontSize(12);
                doc.text(title, 15, yOffset);
                doc.setFont("helvetica", "normal");
                doc.setFontSize(12);

                weekData.forEach((dish, index) => {
                    const day = moment().startOf("isoWeek").add(index, "days").format("dddd");
                    const dishName = dish ? dish.name : "Day Off";
                    doc.text(`• ${day}: ${dishName}`, 15, yOffset + (index + 1) * 10);
                });
            };

            formatMenuData(menuDishes.currentWeek, "Current Week", 30);
            formatMenuData(menuDishes.nextWeek, "Upcoming Week", 120);
            doc.save("WeeklyMenu.pdf");
            showSuccess();
        } catch (error) {
            console.error("PDF Generation Error:", error);
            showError();
        }
    };

    return (
        <div className="flex flex-col items-center">
            <div className="flex flex-row w-full justify-end">
                <NavLink
                    className="bg-blue-400 text-white rounded-3xl p-3 m-3 w-1/6 text-center  hover:bg-gray-200"
                    to={"/GenerateMenu"}>
                    + Generate Menu
                </NavLink>
            </div>

            <div className="flex flex-row w-full justify-end">
                <NavLink
                    className="bg-blue-400 rounded-3xl p-3 m-3 w-1/6 text-center  hover:bg-gray-200"
                    onClick={() => setMenuDishes()}>
                    Test Regenerate Menu
                </NavLink>
            </div>
            <div className="flex flex-row w-full justify-end mb-1">
                <FileUploadIcon onClick={downloadMenuPDF} className="cursor-pointer" />
            </div>

            <div className="flex flex-col gap-10">
                <ToastContainer />
                {/* Current Week menu */}
                <WeeklyMenu weekStartDay={startOfWeek(new Date(), { weekStartsOn: 1 })} />

                {/* Upcoming Week menu */}
                <WeeklyMenu weekStartDay={startOfWeek(addDays(new Date(), 7), { weekStartsOn: 1 })} />
            </div>
        </div>
    );
}
