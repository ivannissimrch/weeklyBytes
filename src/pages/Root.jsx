import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";

export default function RootLayout() {
    return (
        <div className="flex flex-col items-center w-screen">
            <Navbar />
            <main className="flex flex-col items-center w-full bg-[url(/bg.jpg)] bg-cover h-fit">
                <Outlet />
            </main>
            <div className="bg-button-yellow w-screen h-fit flex items-center py-2 px-5 hover:underline">
                <img className="aspect-square w-5" src="./github-mark.svg" />
                <a href="https://github.com/chingu-voyages/V53-tier2-team-26">&nbsp;GitHub | chingu-v53-tier2-team26</a>
            </div>
        </div>
    );
}
