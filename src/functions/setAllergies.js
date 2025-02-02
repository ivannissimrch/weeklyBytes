import { useLoaderData } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useState } from "react";
import { INITIAL_EMPLOYEE_DATA } from "../data/initialEmployeeData";
import identifySafeDishes from "./identifySafeDishes";

export default function setAllergies() {
  // TODO: when allergy data changes, update the menuDishes object in local
  // storage instead of waiting to update when the Home page mounts
  const fetchDishes = useLoaderData();
  const [employeesData, setEmployeesData] = useLocalStorage(
    "employeesData",
    INITIAL_EMPLOYEE_DATA
  );
  const [safeDishes, setSafeDishes] = useLocalStorage("safeDishes", []);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [isEmployeeMenuOpen, setIsEmployeeMenuOpen] = useState(null);
  // const [openMenu, setOpenMenu] = useState(false);

  function updateEmployeeAllergies(selectedEmployee, selectedOptions) {
    const updatedEmployeesData = employeesData.map((employee) => {
      if (employee.name === selectedEmployee.name) {
        employee.allergies = selectedOptions.map((allergy) => {
          return { value: allergy.value, label: allergy.label };
        });
      }
      return employee;
    });
    //save update employees allergies to local storage
    setEmployeesData(updatedEmployeesData);
    //filter employees with allergies
    const employeesWithAllergies = updatedEmployeesData.filter(
      (employee) => employee.allergies.length > 0
    );
    const employeesAllergens = employeesWithAllergies.map((employee) =>
      employee.allergies.flatMap((allergy) => {
        if (
          allergy.label === "Fish" ||
          allergy.label === "Gluten" ||
          allergy.label === "Dairy" ||
          allergy.label === "Shellfish"
        ) {
          return allergy.value.split(" ").concat(allergy.label);
        }
        return allergy.value;
      })
    );
    //list of allergens selected unique values
    const uniqueAllergens = [...new Set(employeesAllergens.flat())];
    //dishes safe for employees
    const updatedSafeDishes = identifySafeDishes(fetchDishes, uniqueAllergens);
    //save safe dishes to local storage
    setSafeDishes(updatedSafeDishes);
  }

  function deleteAllergies(selectedEmployee) {
    const updatedEmployeesData = employeesData.map((employee) => {
      if (employee.name === selectedEmployee.name) {
        employee.allergies = []; // Reset allergies
      }
      return employee;
    });
    setEmployeesData(updatedEmployeesData);
    setEditingEmployee(null);
  }

  return {
    setEditingEmployee,
    updateEmployeeAllergies,
    deleteAllergies,
    setIsEmployeeMenuOpen,
    employeesData,
    isEmployeeMenuOpen,
    editingEmployee,
    safeDishes,
  };
}
