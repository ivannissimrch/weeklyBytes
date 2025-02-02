import { WeeklyMenu } from "../components/weekly-menu/WeeklyMenu";
import { NavLink } from "react-router-dom";
import { addDays, startOfWeek } from "date-fns";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import moment from "moment";
import jsPDF from "jspdf";
import { ToastContainer, toast } from "react-toastify";

export default function Home() {
    const downloadMenuPDF = () => {
        const menuDishes = JSON.parse(localStorage.getItem("generatedWeeklyMenu"));
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
                console.log(weekData);
                doc.setFont("helvetica", "bolditalic");
                doc.setFontSize(12);
                doc.text(title, 15, yOffset);
                doc.setFont("helvetica", "normal");
                doc.setFontSize(12);

                weekData.forEach((dish, index) => {
                    const day = moment().startOf("isoWeek").add(index, "days").format("dddd");
                    const dishName = dish ? dish.menu.name : "Day Off";

                    doc.text(`• ${day}: ${dishName}`, 15, yOffset + (index + 1) * 10);
                });
            };

            formatMenuData(menuDishes, "Current Week", 30);
            // TODO: The upcoming week does not render correctly:
            formatMenuData(menuDishes, "Upcoming Week", 120);
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
                    className="bg-button-blue text-white rounded-3xl p-3 m-3 w-1/4 text-center  hover:bg-gray-400"
                    to={"/GenerateMenu"}>
                    + Generate Menu
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
        <WeeklyMenu
          weekStartDay={startOfWeek(addDays(new Date(), 7), {
            weekStartsOn: 1,
          })}
        />
      </div>
    </div>
  );
}
