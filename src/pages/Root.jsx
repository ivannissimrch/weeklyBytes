import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";

export default function RootLayout() {
    return (
        <div className="flex flex-col items-center w-screen px-10">
            <Navbar />
            <main className="flex flex-col items-center w-full">
                <Outlet />
            </main>
        </div>
    );
}
