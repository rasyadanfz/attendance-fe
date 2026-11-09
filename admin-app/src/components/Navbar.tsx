import { IoMdPeople } from "react-icons/io";
import { FaRegCheckSquare } from "react-icons/fa";
import { Link, useLocation } from "react-router";

function Navbar() {
  const location = useLocation();
  return (
    <nav className="mx-2 flex flex-col gap-4">
      <p className="ml-1 font-bold text-lg">HR App</p>
      <div className="flex flex-col justify-start gap-3">
        <Link
          to="/"
          className={`p-2 pr-4 lg:pr-8 flex gap-2 items-center font-semibold rounded-lg text-sm hover:bg-gray-300 transition-all ${location.pathname === "/" ? "bg-gray-200" : ""}`}
        >
          <IoMdPeople />
          <p>Data Karyawan</p>
        </Link>
        <Link
          to="/attendance"
          className={`p-2 pr-4 lg:pr-8 flex gap-2 items-center font-semibold rounded-lg text-sm hover:bg-gray-300 transition-all ${location.pathname === "/attendance" ? "bg-gray-200" : ""}`}
        >
          <FaRegCheckSquare />
          <p>Absensi</p>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
