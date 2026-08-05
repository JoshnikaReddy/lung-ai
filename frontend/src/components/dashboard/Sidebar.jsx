import {
  FaHome,
  FaUpload,
  FaHistory,
  FaFileAlt,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";

function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white p-6">

      <h1 className="text-3xl font-bold text-blue-400 mb-10">
        LungAI
      </h1>

      <nav className="space-y-6">

        <div className="flex items-center gap-3 cursor-pointer hover:text-blue-400">
          <FaHome />
          Dashboard
        </div>

        <div className="flex items-center gap-3 cursor-pointer hover:text-blue-400">
          <FaUpload />
          Upload
        </div>

        <div className="flex items-center gap-3 cursor-pointer hover:text-blue-400">
          <FaHistory />
          History
        </div>

        <div className="flex items-center gap-3 cursor-pointer hover:text-blue-400">
          <FaFileAlt />
          Reports
        </div>

        <div className="flex items-center gap-3 cursor-pointer hover:text-blue-400">
          <FaUser />
          Profile
        </div>

        <div className="flex items-center gap-3 cursor-pointer hover:text-red-400">
          <FaSignOutAlt />
          Logout
        </div>

      </nav>

    </aside>
  );
}

export default Sidebar;