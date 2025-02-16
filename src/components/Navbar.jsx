import { NavLink } from "react-router-dom";
import { useState } from "react";
import { ToastContainer } from "react-toastify";

import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import useAuthenticateUser from "../hooks/useAuthenticateUser";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { signedIn, handleUserAuthentication } = useAuthenticateUser();

    return (
        <div className="relative py-2 w-screen md:w-[95%] lg:w-[80%] grid grid-cols-3 justify-center items-center h-fit">
            <NavLink className="w-fit col-start-2 md:col-start-1 justify-self-start" to={"/"}>
                <img src="/logo.svg" alt="Website Logo" className="w-[200px] md:w-[160px]" />
            </NavLink>
            <div className="col-start-3 w-fit  absolute right-2 md:hidden">
                <button onClick={() => setIsOpen(!isOpen)} className="p-1">
                    <MenuIcon fontSize="large" />
                </button>
            </div>

            <nav className="hidden md:col-start-2 md:flex md:justify-center md:text-lg md:text-center md:gap-4">
                <ul className="inline-flex space-x-6">
                    <li>
                        <NavLink className={({ isActive }) => (isActive ? "underline" : "")} to={"/"}>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className={({ isActive }) => (isActive ? "underline" : "")} to={"/Allergies"}>
                            Allergies
                        </NavLink>
                    </li>
                </ul>
            </nav>

            <div
                className={`fixed top-0 left-0 h-fit py-9 w-screen bg-white shadow-lg text-center z-10  md:hidden ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                } `}>
                <div className=" w-full grid grid-cols-3 items-center text-xl font-bold">
                    <span className="text-bold col-start-2">Menu</span>
                    <button onClick={() => setIsOpen(false)} className="col-start-3 w-fit  absolute right-3">
                        <CloseIcon fontSize="large" />
                    </button>
                </div>
                <ul className="flex flex-col gap-4 pt-6 text-lg">
                    <li>
                        <NavLink
                            className={({ isActive }) => (isActive ? "underline" : "")}
                            to="/"
                            onClick={() => setIsOpen(false)}>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            className={({ isActive }) => (isActive ? "underline" : "")}
                            to="/Allergies"
                            onClick={() => setIsOpen(false)}>
                            Allergies
                        </NavLink>
                    </li>
                    <li>
                        <button
                            className=" text-[#364688] font-bold py-2 px-6 rounded-full mx-10 border-2 border-[#364688]"
                            onClick={() => {
                                handleUserAuthentication();
                                setIsOpen(false);
                            }}>
                            {!signedIn ? "Manager Login" : "Sign Out"}
                        </button>
                    </li>
                </ul>
            </div>
            {!signedIn ? (
                <button
                    className="hidden lg:block md:block sm border-[#364688] text-[#364688] hover:bg-[#364688] hover:text-white font-bold py-3 px-8 md:px-4 rounded-full border-2 max-w-[50%] justify-self-end"
                    onClick={() => handleUserAuthentication()}>
                    Sign In
                </button>
            ) : (
                <div className="hidden lg:flex md:flex sm flex flex-row justify-self-end items-center">
                    <p>
                        Hello, <span className="font-bold pr-4">Tom!</span>
                    </p>
                    <button
                        className="hidden lg:block md:block sm border-[#364688] text-[#364688] hover:bg-[#364688] hover:text-white font-bold py-3 px-8 rounded-full border-2"
                        onClick={() => handleUserAuthentication()}>
                        Sign Out
                    </button>
                </div>
            )}
            <ToastContainer autoClose={2000} hideProgressBar={true} closeOnClick={true} pauseOnHover />
        </div>
    );
}
