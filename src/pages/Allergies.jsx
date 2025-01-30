import { useLoaderData } from "react-router-dom";
import { ALLERGENS } from "../data/allergens";
import { INITIAL_EMPLOYEE_DATA } from "../data/initialEmployeeData";
import { useLocalStorage } from "../hooks/useLocalStorage";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import Select, { components } from "react-select";
import identifySafeDishes from "../functions/identifySafeDishes";
import { useState } from "react";
import { customStyles } from "../data/customStyles";
import DeleteAllModal from "../components/DeleteAllModal";
import DeleteItemModal from "../components/DeleteItemModal";

export default function Allergies() {
  const fetchDishes = useLoaderData();
  const [employeesData, setEmployeesData] = useLocalStorage(
    "employeesData",
    INITIAL_EMPLOYEE_DATA
  );
  const [safeDishes, setSafeDishes] = useLocalStorage(
    "safeDishes",
    fetchDishes
  );

  const [activeEditingEmployeeName, setActiveEditingEmployeeName] =
    useState(null);
  const [showDeleteAllModal, setShowDeleteAllModal] = useState(false);
  const [deletingEmployee, setDeletingEmployee] = useState(null);
  const [showDeleteItemModal, setShowDeleteItemModal] = useState(false);
  const [optionsSelected, setOptionsSelected] = useState(null);

  function handleClosingDeleteAllDialog(agree) {
    setShowDeleteAllModal(false);
    if (agree) {
      const employeeToDelete = employeesData.find(
        (employee) => employee.name === deletingEmployee
      );
      if (employeeToDelete) {
        console.log(employeeToDelete, optionsSelected);
        deleteAllergies(employeeToDelete);
      }
    }
    setDeletingEmployee(null);
  }

  function handleClosingDeleteItemDialog(agree) {
    setShowDeleteItemModal(false);
    if (agree) {
      console.log(activeEditingEmployeeName);
      console.log(optionsSelected);
      const employeeBeingEdited = employeesData.find(
        (employee) => employee.name === activeEditingEmployeeName
      );
      console.log(employeeBeingEdited);
      updateEmployeeAllergies(employeeBeingEdited, optionsSelected);
    }
    setActiveEditingEmployeeName(null);
    setOptionsSelected(null);
  }

  function updateEmployeeAllergies(selectedEmployee, selectedOptions) {
    console.log(selectedEmployee, selectedOptions);
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
        return { ...employee, allergies: [] }; // Reset allergies
      }
      return employee;
    });
    setEmployeesData(updatedEmployeesData);
    setActiveEditingEmployeeName(null);
  }

  return (
    <>
      <h2 className="text-center m-4 text-[32px] font-normal">Allergies</h2>{" "}
      <section className="flex flex-col w-full">
        <ul className="flex flex-col items-center gap-4 text-[22px]">
          <li className="flex w-full items-center  gap-4">
            <span className="w-[427px] h-[70px] bg-indigo-100 flex justify-center items-center ">
              Employee Name
            </span>
            <span className="w-[427px]  h-[70px] bg-indigo-100 flex justify-center items-center">
              Allergy
            </span>
          </li>
          {employeesData.map((employee) => (
            <li className="flex w-full items-center  gap-4" key={employee.id}>
              <span className="w-[427px]  h-[70px] bg-indigo-100 flex justify-center items-center ">
                {employee.name}
              </span>
              <span className="w-[427px]  h-[70px] bg-indigo-100 relative">
                <Select
                  styles={customStyles}
                  onChange={(selectedOptions, actionMeta) => {
                    setActiveEditingEmployeeName(employee.name);
                    if (actionMeta.removedValue) {
                      setShowDeleteItemModal(true);
                      setOptionsSelected(selectedOptions);
                    }
                    if (actionMeta.action === "select-option") {
                      updateEmployeeAllergies(employee, selectedOptions);
                    }
                  }}
                  closeMenuOnSelect={false}
                  isMulti
                  options={ALLERGENS}
                  value={employee.allergies}
                  placeholder={"[Allergy]"}
                  isClearable={false}
                  isDisabled={
                    employee.allergies.length > 0 && !activeEditingEmployeeName
                  }
                  onMenuOpen={() => {
                    setActiveEditingEmployeeName(employee.name);
                  }}
                  onMenuClose={() => {
                    setActiveEditingEmployeeName(null);
                  }}
                  components={{
                    MultiValueRemove: (props) =>
                      activeEditingEmployeeName === employee.name ? (
                        <components.MultiValueRemove {...props}>
                          <DeleteIcon />
                        </components.MultiValueRemove>
                      ) : null,
                  }}
                />
                {activeEditingEmployeeName !== employee.name &&
                  employee.allergies.length > 0 && (
                    <>
                      <button
                        className="w-10  bg-indigo-100 text- flex justify-center items-center h-8 absolute right-2 top-1 "
                        onClick={(event) => {
                          setActiveEditingEmployeeName(employee.name);
                        }}
                      >
                        <ModeEditOutlineOutlinedIcon fontSize="large" />
                      </button>
                    </>
                  )}
                {employee.allergies.length > 0 &&
                employee.name === activeEditingEmployeeName ? (
                  <button
                    className="w-10  bg-indigo-100 text- flex justify-center items-center h-8 absolute right-2 top-1 "
                    onClick={(event) => {
                      setActiveEditingEmployeeName(null);
                    }}
                  >
                    <SaveOutlinedIcon fontSize="large" />
                  </button>
                ) : (
                  ""
                )}
              </span>
              <button
                className="w-10  bg-white text- flex justify-center items-center h-8 rounded"
                onClick={(event) => {
                  setDeletingEmployee(employee.name);
                  if (employee.allergies.length > 0) {
                    setShowDeleteAllModal(true);
                  }
                }}
                title="Delete all allergies"
              >
                <DeleteIcon fontSize="large" />
              </button>
            </li>
          ))}
        </ul>
      </section>
      <DeleteAllModal
        showDeleteAllModal={showDeleteAllModal}
        handleClosingDeleteAllDialog={handleClosingDeleteAllDialog}
      />
      <DeleteItemModal
        showDeleteItemModal={showDeleteItemModal}
        handleClosingDeleteItemDialog={handleClosingDeleteItemDialog}
      />
    </>
  );
}
