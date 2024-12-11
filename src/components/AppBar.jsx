import { MdAutoGraph } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import * as React from "react";
import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Context } from "./CreateContext";


function ResponsiveNavbar() {
  const navigate = useNavigate();
  const location=useLocation()
  const { setIsLoggedIn } = useContext(Context);

  const handleLogout = () => {
    localStorage.setItem("isLoggedIn", "false");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <>
    {location.pathname !== '/login' && location.pathname !== "/register" && location.pathname !=='/' &&(
    <nav className="fixed w-full bg-gradient-to-r from-green-400 via-pink-500 to-blue-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex items-center">
            <MdAutoGraph className="text-yellow-300 text-4xl mr-3" />
            <a
              href="/expense"
              className="text-white text-2xl font-bold hover:text-yellow-300 transition"
            >
              Expense Tracker
            </a>
          </div>

          {/* Profile Section */}
          <div className="flex items-center">
            <FaUserCircle className="text-white text-3xl hover:text-yellow-300 transition cursor-pointer" onClick={handleLogout} />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden bg-gradient-to-r from-blue-500 to-purple-600 p-4">
        
          <button
            onClick={() => navigate('/expense')}
            className="block w-full text-white text-left font-medium py-2 hover:bg-purple-700 rounded-lg transition"
          >
            Expense
          </button>
        
        <button
          onClick={handleLogout}
          className="block w-full text-left text-red-600 font-semibold py-2 hover:bg-red-500 hover:text-white rounded-lg transition"
        >
          Logout
        </button>
      </div>
    </nav>
  )}</>
  );
}

export default ResponsiveNavbar;
