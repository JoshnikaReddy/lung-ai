import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="w-full bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">

        {/* Logo */}
        <h1 className="text-3xl font-bold text-blue-600">
          LungAI
        </h1>

        {/* Navigation Links */}
        <div className="flex gap-8 text-gray-700 font-medium">

          <Link to="/">Home</Link>

          <Link to="/about">About</Link>

          <Link to="/dashboard">Dashboard</Link>

          <Link to="/login">Login</Link>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;