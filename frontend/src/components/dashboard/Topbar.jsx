import { FaBell, FaSearch } from "react-icons/fa";

function Topbar() {
  return (
    <header className="flex items-center justify-between bg-white shadow-sm p-6">

      <div>
        <h2 className="text-3xl font-bold">
          Dashboard
        </h2>

        <p className="text-gray-500 mt-1">
          Welcome back to LungAI
        </p>
      </div>

      <div className="flex items-center gap-6">

        <div className="flex items-center bg-gray-100 rounded-xl px-4 py-2">
          <FaSearch className="text-gray-500" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none ml-3"
          />
        </div>

        <FaBell className="text-2xl cursor-pointer text-gray-600" />

        <img
          src="https://i.pravatar.cc/40"
          alt="profile"
          className="rounded-full"
        />

      </div>

    </header>
  );
}

export default Topbar;