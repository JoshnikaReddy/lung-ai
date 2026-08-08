import {
  FaHome,
  FaUpload,
  FaHistory,
  FaFileAlt,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";


function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();


  const menuItems = [
    {
      name: "Dashboard",
      icon: FaHome,
      path: "/dashboard",
    },
    {
      name: "Upload",
      icon: FaUpload,
      path: "/upload",
    },
    {
      name: "History",
      icon: FaHistory,
      path: "/history",
    },
    {
      name: "Reports",
      icon: FaFileAlt,
      path: "/reports",
    },
    {
      name: "Profile",
      icon: FaUser,
      path: "/profile",
    },
  ];


  return (
    <aside className="w-64 min-h-screen bg-slate-950 text-white p-6 flex flex-col">

      {/* Logo */}
      <h1
        className="text-3xl font-bold text-blue-400 mb-10 cursor-pointer"
        onClick={() => navigate("/dashboard")}
      >
        LungAI
      </h1>


      {/* Navigation */}
      <nav className="space-y-2">

        {menuItems.map((item) => {

          const Icon = item.icon;

          const isActive =
            location.pathname === item.path;


          return (
            <div
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`
                flex items-center gap-3
                px-4 py-3
                rounded-xl
                cursor-pointer
                transition-all
                ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-gray-300 hover:bg-slate-800 hover:text-white"
                }
              `}
            >

              <Icon size={18} />

              <span className="font-medium">
                {item.name}
              </span>

            </div>
          );

        })}

      </nav>


      {/* Logout */}
      <div className="mt-auto pt-8">

        <div
          onClick={() => navigate("/login")}
          className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer text-gray-300 hover:bg-red-600 hover:text-white transition-all"
        >

          <FaSignOutAlt size={18} />

          <span className="font-medium">
            Logout
          </span>

        </div>

      </div>

    </aside>
  );
}


export default Sidebar;