import jsPDF from "jspdf";
import { toast } from "react-toastify";

const showSuccess = () => {
    toast.success("Your menu is downloading!", {
        theme: "colored",
    });
};
const showError = () => {
    toast.error("There was an error. Please try again!", {
        theme: "colored",
    });
};

// converts an array of objects to a string of allergies
const toStringEmployeeAllergies = (allergiesList) => {
    return allergiesList.map((allergy) => allergy.label).join(", ");
};

export default function generateAllergiesPDF() {
    const employeesData = JSON.parse(localStorage.getItem("employeesData"));

    try {
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.width;
        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        doc.text("Employee Allergies List", pageWidth / 2, 20, "center");

        // if local storage exists and is not empty
        if (employeesData !== null && employeesData.length > 0) {
            employeesData.forEach((employee, index) => {
                doc.setFont("helvetica", "bolditalic");
                doc.setFontSize(12);
                doc.text(
                    `Employee Name: ${employee.name}`,
                    10,
                    40 + index * 20
                );
                
                doc.setFont("helvetica", "normal");
                doc.setFontSize(12);

                if (employee.allergies.length === 0) {
                    doc.text(`Allergies: None`, 10, 50 + index * 20);
                } else {
                    let allergiesString = toStringEmployeeAllergies(
                        employee.allergies
                    );
                    doc.text(
                        `Allergies: ${allergiesString}`,
                        10,
                        50 + index * 20
                    );
                }
                //doc.line(10, 33 + index * 20, pageWidth - 10, 33 + index * 20);
            });
            doc.save("allergies.pdf");
            showSuccess();
        } else {
            showError();
        }
    } catch (error) {
        console.error("PDF Generation Error:", error);
        showError();
    }
}
