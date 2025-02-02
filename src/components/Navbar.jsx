import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="grid grid-cols-3 items-center w-full">
      <img
        src="/logo.svg"
        alt="Website Logo"
        className="grid items-center pt-6 w-40"
      />

      <nav className="flex-grow text-center text-lg gap-4">
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
    </div>
  );
}
