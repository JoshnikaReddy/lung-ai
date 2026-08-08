import {
  FaHome,
  FaUpload,
  FaHistory,
  FaFileAlt,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  return (
    <aside className="w-64 min-h-screen bg-slate-950 text-white p-6">

      {/* Logo */}
      <h1 className="text-3xl font-bold text-blue-400 mb-10">
        LungAI
      </h1>

      {/* Navigation */}
      <nav className="space-y-6">

        {/* Dashboard */}
        <div
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-3 cursor-pointer hover:text-blue-400 transition"
        >
          <FaHome />
          Dashboard
        </div>


        {/* Upload */}
        <div
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-3 cursor-pointer hover:text-blue-400 transition"
        >
          <FaUpload />
          Upload
        </div>


        {/* History */}
        <div
          onClick={() => navigate("/history")}
          className="flex items-center gap-3 cursor-pointer hover:text-blue-400 transition"
        >
          <FaHistory />
          History
        </div>


        {/* Reports */}
        <div
          onClick={() => navigate("/reports")}
          className="flex items-center gap-3 cursor-pointer hover:text-blue-400 transition"
        >
          <FaFileAlt />
          Reports
        </div>


        {/* Profile */}
        <div
          onClick={() => navigate("/profile")}
          className="flex items-center gap-3 cursor-pointer hover:text-blue-400 transition"
        >
          <FaUser />
          Profile
        </div>


        {/* Logout */}
        <div
          onClick={() => navigate("/login")}
          className="flex items-center gap-3 cursor-pointer hover:text-red-400 transition"
        >
          <FaSignOutAlt />
          Logout
        </div>

      </nav>

    </aside>
  );
}

export default Sidebar;