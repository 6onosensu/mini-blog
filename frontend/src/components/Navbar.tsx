import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">MiniBlog</Link>
        <div className="space-x-4 text-sm sm:text-base">
          <Link to="/login" className="text-gray-700 hover:text-blue-600 transition">Login</Link>
          <Link to="/register" className="text-gray-700 hover:text-blue-600 transition">Register</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
