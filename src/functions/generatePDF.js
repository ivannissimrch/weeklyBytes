import jsPDF from "jspdf";
import moment from "moment";
import { toast } from "react-toastify";

export default function downloadMenuPDF() {
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
}
