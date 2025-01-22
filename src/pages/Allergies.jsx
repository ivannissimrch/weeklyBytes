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
  //get dishes from loader
  const fetchedDishes = useLoaderData();
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
    const safeDishes = getSafeDishes(fetchedDishes, uniqueAllergens);
    console.log(safeDishes);
    //save safe dishes to local storage
    storeSafeDishes(safeDishes);
  }

  return (
    <>
      <section>
        <h2>Allergies</h2>{" "}
        <ul>
          {employeesData.map((employee) => (
            <li key={employee.name}>
              <span>{employee.name}</span>
              <span>
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

//Dishes API loader I could use the dishes function instead of this one but the way it was writing does not work as a loader.
export async function dishesDataLoader() {
  try {
    const ApiResponse = await fetch("https://menus-api.vercel.app/dishes");
    if (!ApiResponse.ok) {
      throw new Error(`Response status: ${ApiResponse.status}`);
    }
    const dishesData = await ApiResponse.json();
    return dishesData;
  } catch (error) {
    console.error(error.message);
    return [];
  }
}
