import { IoMdExit, IoMdPeople } from "react-icons/io";
import { FaRegCheckSquare } from "react-icons/fa";
import { Link, useLocation } from "react-router";
import { useAuth } from "../hooks/useAuth";

function Navbar() {
    const location = useLocation();
    const { clearAccessToken } = useAuth();
    return (
        <nav className="mx-2 flex flex-col gap-4 h-full">
            <p className="ml-1 font-bold text-lg">HR App</p>
            <div className="flex flex-col justify-start gap-3">
                <Link
                    to="/"
                    className={`p-2 pr-4 lg:pr-8 flex gap-2 items-center font-semibold rounded-lg text-sm hover:bg-gray-300 transition-all ${location.pathname === "/" ? "bg-gray-200" : ""}`}
                >
                    <IoMdPeople />
                    <p>Employees</p>
                </Link>
                <Link
                    to="/attendance"
                    className={`p-2 pr-4 lg:pr-8 flex gap-2 items-center font-semibold rounded-lg text-sm hover:bg-gray-300 transition-all ${location.pathname === "/attendance" ? "bg-gray-200" : ""}`}
                >
                    <FaRegCheckSquare />
                    <p>Attendance</p>
                </Link>
            </div>
            <button
                type="button"
                className="flex gap-2 items-center p-2 pr-4 font-semibold text-base hover:text-red-400 hover:cursor-pointer hover:border hover:rounded-lg mt-auto mb-8"
                onClick={clearAccessToken}
            >
                <IoMdExit />
                <p>Logout</p>
            </button>
        </nav>
    );
}

export default Navbar;
