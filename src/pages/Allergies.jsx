import { useLoaderData } from "react-router-dom";
import { ALLERGENS } from "../data/allergens";
import { INITIAL_EMPLOYEE_DATA } from "../data/initialEmployeeData";
import { useLocalStorage } from "../hooks/useLocalStorage";
import Select, { components } from "react-select";
import { useState } from "react";
import { customStyles } from "../data/customStyles";
import { NavLink } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import DeleteIcon from "@mui/icons-material/Delete";
import RefreshIcon from "@mui/icons-material/Refresh";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import ArrowDropUpOutlinedIcon from "@mui/icons-material/ArrowDropUpOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DownloadIcon from "@mui/icons-material/Download";

import identifySafeDishes from "../functions/identifySafeDishes";
import DeleteAllModal from "../components/DeleteAllModal";
import DeleteItemModal from "../components/DeleteItemModal";
import generateAllergiesPDF from "../functions/generateAllergiesPDF";
import useAuthenticateUser from "../hooks/useAuthenticateUser";

export default function Allergies() {
    const fetchDishes = useLoaderData();
    const [employeesData, setEmployeesData] = useLocalStorage("employeesData", INITIAL_EMPLOYEE_DATA);
    const [safeDishes, setSafeDishes] = useLocalStorage("safeDishes", fetchDishes);

    const [activeEditingEmployeeName, setActiveEditingEmployeeName] = useState(null);
    const [showDeleteAllModal, setShowDeleteAllModal] = useState(false);
    const [deletingEmployee, setDeletingEmployee] = useState(null);
    const [showDeleteItemModal, setShowDeleteItemModal] = useState(false);
    const [optionsSelected, setOptionsSelected] = useState(null);
    const [openDropDown, setOpenDropDown] = useState(false);
    const { signedIn } = useAuthenticateUser();

    function handleClosingDeleteAllDialog(agree) {
        setShowDeleteAllModal(false);
        if (agree) {
            const employeeToDelete = employeesData.find((employee) => employee.name === deletingEmployee);
            if (employeeToDelete) {
                deleteAllergies(employeeToDelete);
            }
        }
        setDeletingEmployee(null);
    }

    function handleClosingDeleteItemDialog(agree) {
        setShowDeleteItemModal(false);
        if (agree) {
            const employeeBeingEdited = employeesData.find((employee) => employee.name === activeEditingEmployeeName);
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
        const employeesWithAllergies = updatedEmployeesData.filter((employee) => employee.allergies.length > 0);
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
        <section className="flex flex-col items-center py-2 w-[95%] md:w-[95%] lg:w-[60%]">
            <ToastContainer />
            <div className="grid grid-col grid-cols-3 py-2 items-center justify-between w-full ">
                <NavLink
                    className="w-fit text-white hover:text-button-yellow flex flex-row items-center justify-start"
                    to={"/"}>
                    <ArrowBackIcon fontSize="medium" className="" />
                    <span className="hidden md:block md:text-md">Return to Home</span>
                    <span className="md:hidden text-xs">Home</span>
                </NavLink>

                <h2 className="text-center text-lg md:text-3xl text-white">Allergies</h2>
                {signedIn && (
                    <div className="justify-self-end">
                        <button
                            onClick={generateAllergiesPDF}
                            type="button"
                            className="hidden md:flex md:flex-row md:bg-white md:border-2 md:border-[#364688] md:text-[#364688] md:justify-center md:items-center md:rounded-full md:h-[36px] md:w-fit md:px-[24px] md:py-[6px] md:hover:border-2 md:hover:border-solid md:hover:border-white md:hover:bg-[#364688] md:hover:text-white md:cursor-pointer">
                            <DownloadIcon fontSize="small" className="cursor-pointer" />
                            <span>&nbsp;Export Allergies</span>
                        </button>
                        <button
                            onClick={generateAllergiesPDF}
                            type="button"
                            className="md:hidden flex flex-row text-white justify-center items-center w-fit rounded-full p-[2px]">
                            <DownloadIcon fontSize="medium" className="cursor-pointer" />
                        </button>
                    </div>
                )}
            </div>
            <section className="flex flex-col w-full items-center py-4 md:py-6 bg-custom-yellow">
                <ul className="flex flex-col w-[95%] md:w-4/5 items-center gap-2 md:gap-4 text-sm md:text-lg">
                    <li className="flex w-full items-center  ">
                        <span className="w-[45%]  py-2 flex justify-center items-start shadow-none font-bold underline">
                            Employee Name
                        </span>
                        <span className="w-[55%]  py-2 flex justify-center items-start shadow-none font-bold underline">
                            Allergy
                        </span>
                    </li>
                    {employeesData.map((employee, index) => (
                        <li
                            className="flex w-full justify-start items-center gap-1 md:gap-4 bg-white bg-transparent"
                            key={employee.id}>
                            <div
                                className={`w-full flex flex-row shadow-md text-xs md:text-lg ${
                                    index % 2 === 0 ? "bg-white" : "bg-highlight-yellow"
                                }`}>
                                <span className="w-[40%] p-2 flex justify-start items-center ">{employee.name}</span>
                                <div className="w-[50%] md:w-[55%] h-auto  flex justify-end items-center">
                                    <span className="w-[90%] h-auto relative ">
                                        <Select
                                            aria-label={`Allergies for ${employee.name}`}
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
                                            menuIsOpen={activeEditingEmployeeName === employee.name && openDropDown}
                                            menuPlacement="auto"
                                            closeMenuOnSelect={false}
                                            isMulti
                                            options={ALLERGENS}
                                            value={employee.allergies}
                                            placeholder={"[Select Allergy]"}
                                            isClearable={false}
                                            onMenuOpen={() => {
                                                setActiveEditingEmployeeName(employee.name);
                                                setOpenDropDown(true);
                                            }}
                                            onMenuClose={() => {}}
                                            components={{
                                                MultiValueRemove: (props) =>
                                                    openDropDown && activeEditingEmployeeName === employee.name ? (
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
                                </div>
                                <button
                                    className="w-[10%] md:w-[5%] flex flex-row justify-center items-center text-black hover:text-[red]"
                                    onClick={() => {
                                        setDeletingEmployee(employee.name);
                                        if (employee.allergies.length > 0) {
                                            setShowDeleteAllModal(true);
                                        }
                                    }}
                                    title="Delete all allergies">
                                    <RefreshIcon fontSize="small" />
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
