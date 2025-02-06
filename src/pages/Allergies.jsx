import { useLoaderData } from "react-router-dom";
import { ALLERGENS } from "../data/allergens";
import { INITIAL_EMPLOYEE_DATA } from "../data/initialEmployeeData";
import { useLocalStorage } from "../hooks/useLocalStorage";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import ArrowDropUpOutlinedIcon from "@mui/icons-material/ArrowDropUpOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import Select, { components } from "react-select";
import identifySafeDishes from "../functions/identifySafeDishes";
import { useState } from "react";
import { customStyles } from "../data/customStyles";
import DeleteAllModal from "../components/DeleteAllModal";
import DeleteItemModal from "../components/DeleteItemModal";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { NavLink } from "react-router-dom";

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
  const [openDropDown, setOpenDropDown] = useState(false);

  function handleClosingDeleteAllDialog(agree) {
    setShowDeleteAllModal(false);
    if (agree) {
      const employeeToDelete = employeesData.find(
        (employee) => employee.name === deletingEmployee
      );
      if (employeeToDelete) {
        deleteAllergies(employeeToDelete);
      }
    }
    setDeletingEmployee(null);
  }

  function handleClosingDeleteItemDialog(agree) {
    setShowDeleteItemModal(false);
    if (agree) {
      const employeeBeingEdited = employeesData.find(
        (employee) => employee.name === activeEditingEmployeeName
      );
      updateEmployeeAllergies(employeeBeingEdited, optionsSelected);
    }
    setActiveEditingEmployeeName(null);
    setOptionsSelected(null);
  }

  function updateEmployeeAllergies(selectedEmployee, selectedOptions) {
    const updatedEmployeesData = employeesData.map((employee) => {
      if (employee.name === selectedEmployee.name) {
        return {
          ...employee,
          allergies: selectedOptions.map((allergy) => ({
            value: allergy.value,
            label: allergy.label,
          })),
        };
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
          allergy.label === "Shellfish" ||
          allergy.label === "Eggs" ||
          allergy.label === "Citrus" ||
          allergy.label === "Tomatoes" ||
          allergy.label === "Onions"
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
    updateEmployeeAllergies(selectedEmployee, []);
    setActiveEditingEmployeeName(null);
  }

  return (
    <section className="flex flex-col items-center w-[95%] md:w-[95%] lg:w-[60%]">
      <div className="grid grid-col grid-cols-3 py-2 items-center justify-between w-full">
        <NavLink
          className="w-fit hover:text-button-blue flex flex-row items-center justify-start"
          to={"/"}
        >
          <ArrowBackIcon fontSize="medium" className="" />
          <span className="hidden md:block md:text-md">Return to Home</span>
          <span className="md:hidden text-xs">Home</span>
        </NavLink>
        <h2 className="text-center text-lg md:text-2xl ">Allergies</h2>
      </div>
      <section className="flex flex-col w-full items-center bg-custom-blue py-4 md:py-6">
        <ul className="flex flex-col w-[95%] md:w-4/5 items-center gap-2 md:gap-4 text-sm md:text-lg">
          <li className="flex w-full items-center  gap-1 md:gap-4">
            <span className="w-1/2 py-2 bg-white flex justify-center items-center shadow-md">
              Employee Name
            </span>
            <span className="w-1/2 py-2 bg-white flex justify-center items-center shadow-md">
              Allergy
            </span>
          </li>
          {employeesData.map((employee) => (
            <li
              className="flex w-full justify-start items-center  gap-1 md:gap-4"
              key={employee.id}
            >
              <span className="w-1/2 py-2 bg-white flex justify-center items-center shadow-md">
                {employee.name}
              </span>
              <div className="w-1/2 flex justify-between items-center">
                <span className="w-[85%] md:w-[90%] bg-white relative shadow-md">
                  <Select
                    onBlur={() => {
                      setOpenDropDown(false);
                    }}
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
                    menuIsOpen={
                      activeEditingEmployeeName === employee.name &&
                      openDropDown
                    }
                    closeMenuOnSelect={false}
                    isMulti
                    options={ALLERGENS}
                    value={employee.allergies}
                    placeholder={"[Allergy]"}
                    isClearable={false}
                    onMenuOpen={() => {
                      setActiveEditingEmployeeName(employee.name);
                      setOpenDropDown(true);
                    }}
                    onMenuClose={() => {}}
                    components={{
                      MultiValueRemove: (props) =>
                        openDropDown &&
                        activeEditingEmployeeName === employee.name ? (
                          <components.MultiValueRemove {...props}>
                            <DeleteIcon />
                          </components.MultiValueRemove>
                        ) : null,
                      DropdownIndicator: (props) =>
                        employee.allergies.length > 0 ? (
                          <components.DropdownIndicator {...props}>
                            <ModeEditOutlineOutlinedIcon />
                          </components.DropdownIndicator>
                        ) : activeEditingEmployeeName === employee.name ? (
                          <ArrowDropUpOutlinedIcon />
                        ) : (
                          <ArrowDropDownOutlinedIcon />
                        ),
                    }}
                  />

                </span>
                <button
                  className="w-[15%] md:w-[10%] flex flex-row justify-center items-center text-black hover:text-[red]"
                  onClick={(event) => {
                    setDeletingEmployee(employee.name);
                    if (employee.allergies.length > 0) {
                      setShowDeleteAllModal(true);
                    }
                  }}
                  title="Delete all allergies"
                >
                  <DeleteIcon fontSize="medium" />
                </button>
              </div>
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
    </section>
  );
}
