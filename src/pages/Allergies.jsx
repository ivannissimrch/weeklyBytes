import { useState } from "react";
import Select from "react-select";
import { useLoaderData } from "react-router-dom";
import { ALLERGENS } from "../data/allergens";
import { INITIAL_EMPLOYEE_DATA } from "../data/initialEmployeeData";
import storeEmployeesInfo from "../functions/storeEmployeesInfo";
import getEmployeesInfoLocal from "../functions/getEmployeesInfoLocal";
import storeSafeDishes from "../functions/storeSafeDishes";
import getSafeDishes from "../functions/getSafeDishes";

export default function Allergies() {
  const fetchDishes = useLoaderData();
  const storedEmployeesData = getEmployeesInfoLocal();
  const [employeesData, setEmployeesData] = useState(
    storedEmployeesData !== null ? storedEmployeesData : INITIAL_EMPLOYEE_DATA
  );

  function updateEmployeeAllergies(selectedEmployee, selectedOptions) {
    const updatedEmployeesData = employeesData.map((employee) => {
      if (employee.name === selectedEmployee.name) {
        employee.allergies = selectedOptions.map((allergy) => {
          return { value: allergy.value, label: allergy.label };
        });
      }
      return employee;
    });
    setEmployeesData(updatedEmployeesData);
    //save update employees allergies to local storage
    storeEmployeesInfo(updatedEmployeesData);

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
    const safeDishes = getSafeDishes(fetchDishes, uniqueAllergens);
    //save safe dishes to local storage
    storeSafeDishes(safeDishes);
  }

  return (
    <>
      <h2 className="text-center m-4">Allergies</h2>{" "}
      <section className="flex flex-col w-full">
        <ul className="flex flex-col items-center gap-2">
          <li className="flex w-full items-center  gap-2">
            <span className="w-56 bg-slate-100 flex justify-center items-center h-10">
              Employee Name
            </span>
            <span className="w-96 bg-slate-100 flex justify-center items-center h-10">
              Allergy
            </span>
          </li>
          {employeesData.map((employee) => (
            <li className="flex w-full items-center  gap-2" key={employee.name}>
              <span className="w-56 bg-slate-100 flex justify-center items-center h-10">
                {employee.name}
              </span>
              <span className="w-96 bg-slate-100">
                <Select
                  onChange={(selectedOptions) =>
                    updateEmployeeAllergies(employee, selectedOptions)
                  }
                  closeMenuOnSelect={false}
                  isMulti
                  options={ALLERGENS}
                  value={employee.allergies}
                />
              </span>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
