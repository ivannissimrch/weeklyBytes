import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";

export default function RootLayout() {
    return (
        <div className="flex flex-col items-center w-screen">
            <Navbar />
            <main className="flex flex-col items-center w-full bg-[url(/bg.jpg)] bg-cover h-fit">
                <Outlet />
            </main>
        </div>
    );
}
