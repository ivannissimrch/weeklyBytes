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
                        <li className="flex w-full justify-start items-center  gap-4" key={employee.name}>
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
                                            className="bg-custom-blue flex justify-center text- flex justify-center items-center h-8 absolute right-2 top-2 "
                                            onClick={() => {
                                                setEditingEmployee(employee.name);
                                                setIsEmployeeMenuOpen(employee.name);
                                            }}>
                                            <ModeEditOutlineOutlinedIcon fontSize="medium" />
                                        </button>
                                    )}
                                    {employee.allergies.length > 0 && employee.name === editingEmployee ? (
                                        <button
                                            className="bg-custom-blue flex justify-center text- flex justify-center items-center h-8 absolute right-2 top-2 "
                                            onClick={() => {
                                                setEditingEmployee(null);
                                            }}>
                                            <SaveOutlinedIcon fontSize="medium" />
                                        </button>
                                    ) : (
                                        ""
                                    )}
                                </span>

                                <button
                                    className="w-1/12 flex justify-center items-center rounded-full bg-custom-blue m-1 h-full p-1"
                                    onClick={() => deleteAllergies(employee)}
                                    title="Delete all allergies">
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
