import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <NavLink to={"/"}> Home</NavLink>
      <NavLink to={"/Allergies"}> Allergies</NavLink>
    </nav>
  );
}
