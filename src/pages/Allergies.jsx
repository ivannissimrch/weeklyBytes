import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import Select, { components } from "react-select";

import { useLocalStorage } from "../hooks/useLocalStorage";
import { customStyles } from "../data/customStyles";
import { ALLERGENS } from "../data/allergens";
import { INITIAL_EMPLOYEE_DATA } from "../data/initialEmployeeData";

import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import identifySafeDishes from "../functions/identifySafeDishes";

export default function Allergies() {
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

  return (
    <div className="flex flex-col items-center w-full">
      <h2 className="text-center m-4 text-2xl font-normal">Allergies</h2>{" "}
      <section className="flex flex-col w-full items-center">
        <ul className="flex flex-col w-4/5 items-center gap-4 text-lg">
          <li className="flex w-full items-center  gap-4">
            <span className="w-1/2 py-2 bg-custom-blue flex justify-center flex justify-center items-center ">
              Employee Name
            </span>
            <span className="w-1/2 py-2 bg-custom-blue flex justify-center flex justify-center items-center">
              Allergy
            </span>
          </li>
          {employeesData.map((employee) => (
            <li
              className="flex w-full justify-start items-center  gap-4"
              key={employee.name}
            >
              <span className="w-1/2 py-2 bg-custom-blue flex justify-center flex justify-center items-center ">
                {employee.name}
              </span>
              <div className="w-1/2 flex justify-between items-center">
                <span className="w-11/12 bg-custom-blue relative">
                  <Select
                    styles={customStyles}
                    onChange={(selectedOptions) =>
                      updateEmployeeAllergies(employee, selectedOptions)
                    }
                    closeMenuOnSelect={false}
                    isMulti
                    options={ALLERGENS}
                    value={employee.allergies}
                    placeholder={"[Allergy]"}
                    isClearable={false}
                    isDisabled={
                      employee.allergies.length > 0 && !isEmployeeMenuOpen
                    }
                    onMenuOpen={() => {
                      setIsEmployeeMenuOpen(employee.name);
                      setEditingEmployee(employee.name);
                    }}
                    onMenuClose={() => {
                      setIsEmployeeMenuOpen(null);
                    }}
                    components={{
                      MultiValueRemove: (props) =>
                        editingEmployee === employee.name &&
                        isEmployeeMenuOpen === employee.name ? (
                          <components.MultiValueRemove {...props}>
                            <DeleteIcon />
                          </components.MultiValueRemove>
                        ) : null,
                    }}
                  />
                  {isEmployeeMenuOpen !== employee.name &&
                    employee.allergies.length > 0 && (
                      <button
                        className="bg-custom-blue flex justify-center text- flex justify-center items-center h-8 absolute right-2 top-2 "
                        onClick={(event) => {
                          setEditingEmployee(employee.name);
                          setIsEmployeeMenuOpen(employee.name);
                        }}
                      >
                        <ModeEditOutlineOutlinedIcon fontSize="medium" />
                      </button>
                    )}
                  {employee.allergies.length > 0 &&
                  employee.name === editingEmployee ? (
                    <button
                      className="bg-custom-blue flex justify-center text- flex justify-center items-center h-8 absolute right-2 top-2 "
                      onClick={(event) => {
                        setEditingEmployee(null);
                      }}
                    >
                      <SaveOutlinedIcon fontSize="medium" />
                    </button>
                  ) : (
                    ""
                  )}
                </span>

                <button
                  className="w-1/12 flex justify-center items-center rounded-full bg-custom-blue m-1 h-full p-1"
                  onClick={(event) => deleteAllergies(employee)}
                  title="Delete all allergies"
                >
                  <DeleteIcon fontSize="medium" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
