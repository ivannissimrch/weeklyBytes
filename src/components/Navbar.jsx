import { NavLink } from "react-router-dom";

export default function Navbar() {
    return (
        <div className="grid grid-cols-3 items-center">
            <div className="grid items-center aspect-square bg-slate-300 p-1 w-24">WeeklyBytes</div>
            <nav className="flex-grow text-center gap-4">
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
        </div>
    );
}
