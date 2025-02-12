import { NavLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative py-5 w-screen md:w-[95%] lg:w-[80%] grid grid-cols-3 justify-center items-center">
      <NavLink
        className="w-fit col-start-2 md:col-start-1 justify-self-start"
        to={"/"}
      >
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
            <NavLink
              className={({ isActive }) => (isActive ? "underline" : "")}
              to={"/"}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? "underline" : "")}
              to={"/Allergies"}
            >
              Allergies
            </NavLink>
          </li>
        </ul>
      </nav>

      <div
        className={`fixed top-0 left-0 h-fit py-9 w-screen bg-white shadow-lg text-center z-10  md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } `}
      >
        <div className=" w-full grid grid-cols-3 items-center text-xl font-bold">
          <span className="text-bold col-start-2">Menu</span>
          <button
            onClick={() => setIsOpen(false)}
            className="col-start-3 w-fit  absolute right-3"
          >
            <CloseIcon fontSize="large" />
          </button>
        </div>
        <ul className="flex flex-col gap-4 pt-6 text-lg">
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? "underline" : "")}
              to="/"
              onClick={() => setIsOpen(false)}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? "underline" : "")}
              to="/Allergies"
              onClick={() => setIsOpen(false)}
            >
              Allergies
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}
