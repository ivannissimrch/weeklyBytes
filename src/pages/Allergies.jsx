import Select, { components } from "react-select";
import { customStyles } from "../data/customStyles";
import { ALLERGENS } from "../data/allergens";

import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import setAllergies from "../functions/setAllergies";

export default function Allergies() {
    const {
        setEditingEmployee,
        updateEmployeeAllergies,
        deleteAllergies,
        setIsEmployeeMenuOpen,
        employeesData,
        isEmployeeMenuOpen,
        editingEmployee,
    } = setAllergies();

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
                        <li className="flex w-full items-center  gap-4" key={employee.name}>
                            <span className="w-[427px]  h-[70px] bg-indigo-100 flex justify-center items-center ">
                                {employee.name}
                            </span>
                            <span className="w-[427px]  h-[70px] bg-indigo-100 relative">
                                <Select
                                    styles={customStyles}
                                    onChange={(selectedOptions) => updateEmployeeAllergies(employee, selectedOptions)}
                                    closeMenuOnSelect={false}
                                    isMulti
                                    options={ALLERGENS}
                                    value={employee.allergies}
                                    placeholder={"[Allergy]"}
                                    isClearable={false}
                                    isDisabled={employee.allergies.length > 0 && !isEmployeeMenuOpen}
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
                                {isEmployeeMenuOpen !== employee.name && employee.allergies.length > 0 && (
                                    <button
                                        className="w-10  bg-indigo-100 text- flex justify-center items-center h-8 absolute right-2 top-1 "
                                        onClick={(event) => {
                                            setEditingEmployee(employee.name);
                                            setIsEmployeeMenuOpen(employee.name);
                                        }}>
                                        <ModeEditOutlineOutlinedIcon fontSize="large" />
                                    </button>
                                )}
                                {employee.allergies.length > 0 && employee.name === editingEmployee ? (
                                    <button
                                        className="w-10  bg-indigo-100 text- flex justify-center items-center h-8 absolute right-2 top-1 "
                                        onClick={(event) => {
                                            setEditingEmployee(null);
                                        }}>
                                        <SaveOutlinedIcon fontSize="large" />
                                    </button>
                                ) : (
                                    ""
                                )}
                            </span>

                            <button
                                className="w-10  bg-white text- flex justify-center items-center h-8 rounded"
                                onClick={(event) => deleteAllergies(employee)}
                                title="Delete all allergies">
                                <DeleteIcon fontSize="large" />
                            </button>
                        </li>
                    ))}
                </ul>
            </section>
        </>
    );
}
