import {
  FaHome,
  FaBuilding,
  FaFolderOpen,
  FaFileExcel,
  FaChartBar,
  FaCog,
  FaUserCheck,
} from "react-icons/fa";
import { FaUser } from "react-icons/fa";

import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Sidebar() {
  const { user, logout } =
    useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const menuClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
      isActive
        ? "bg-blue-600 text-white"
        : "hover:bg-slate-800 text-slate-200"
    }`;

  return (
<div className="fixed left-0 top-0 h-screen w-64 bg-slate-900 text-white flex flex-col z-50">
      {/* Top Section */}
<div className="flex-1 overflow-y-auto">

        {/* Logo */}
        <div className="p-6 border-b border-slate-700">
          <h1 className="text-3xl font-bold tracking-wide">
            EFC
          </h1>

          <p className="text-sm text-slate-400">
            Verification Portal
          </p>
        </div>

        {/* Navigation */}
        <div className="p-4">
          <nav className="flex flex-col gap-2">

            <NavLink
              to="/"
              className={menuClass}
            >
              <FaHome />
              Dashboard
            </NavLink>

            <NavLink
              to="/companies"
              className={menuClass}
            >
              <FaBuilding />
              Companies
            </NavLink>

            <NavLink
              to="/cases"
              className={menuClass}
            >
              <FaFolderOpen />
              Cases
            </NavLink>

            <NavLink
              to="/reports"
              className={menuClass}
            >
              <FaChartBar />
              Reports
            </NavLink>

            <NavLink
              to="/export"
              className={menuClass}
            >
              <FaFileExcel />
              Export Excel
            </NavLink>

            <NavLink
              to="/verifiers"
              className={menuClass}
            >
              <FaUserCheck />
              Verifiers
            </NavLink>

            <NavLink
              to="/settings"
              className={menuClass}
            >
              <FaCog />
              Settings
            </NavLink>

          </nav>
        </div>

      </div>

      {/* Bottom User Section */}
      <div className="border-t border-slate-700 p-4">

        <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-3">
  <FaUser className="text-white text-lg" />
</div>

        <div>
  <p className="font-semibold">
  {user?.userId || "EFC001"}
</p>

<p className="text-sm text-slate-400">
  {user?.role || "Admin"}
</p>
</div>

        <button
          onClick={handleLogout}
          className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition"
        >
          Logout
        </button>

      </div>

    </div>
  );
}