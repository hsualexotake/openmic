import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaHome, FaMicrophone, FaSignInAlt, FaUserPlus, FaSignOutAlt, FaPlusCircle, FaCog } from "react-icons/fa";

const Navbar = ({ token, setToken, isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  };

  // Check if route is active
  const isActive = (path) =>
    location.pathname === path
      ? "bg-gray-100 text-purple-600 font-semibold"
      : "hover:bg-gray-100 text-gray-800";

  return (
    <div
      className={`fixed top-0 left-0 h-full bg-white text-gray-800 shadow-lg z-50 transition-all duration-300 ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      <div className="flex flex-col h-full p-4">
        {/* Toggle Sidebar */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-600 p-2 rounded-lg hover:bg-gray-100 transition self-end"
        >
          {isOpen ? "✖️" : "☰"}
        </button>

        {/* Logo */}
        {isOpen && (
          <h1
            className="text-2xl font-bold my-6 cursor-pointer text-center text-purple-600"
            onClick={() => navigate("/")}
          >
            🎤 NYC Mics
          </h1>
        )}

        {/* Navigation */}
        <nav className="flex flex-col space-y-2 mt-6">
          <button
            onClick={() => navigate("/")}
            className={`flex items-center gap-3 p-3 rounded-lg transition ${isActive("/")}`}
          >
            <FaHome /> {isOpen && "Home"}
          </button>

          <button
            onClick={() => navigate("/mics")}
            className={`flex items-center gap-3 p-3 rounded-lg transition ${isActive("/mics")}`}
          >
            <FaMicrophone /> {isOpen && "Open Mics"}
          </button>

          {token && (
            <button
              onClick={() => navigate("/add-mic")}
              className={`flex items-center gap-3 p-3 rounded-lg transition ${isActive("/add-mic")}`}
            >
              <FaPlusCircle /> {isOpen && "Add Open Mic"}
            </button>
          )}
        </nav>

        {/* Bottom Section */}
        <div className="mt-auto space-y-2">
          {token ? (
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 p-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition w-full"
            >
              <FaSignOutAlt /> {isOpen && "Logout"}
            </button>
          ) : (
            <>
              <button
                onClick={() => navigate("/login")}
                className={`flex items-center gap-3 p-3 rounded-lg transition ${isActive("/login")}`}
              >
                <FaSignInAlt /> {isOpen && "Login"}
              </button>

              <button
                onClick={() => navigate("/signup")}
                className={`flex items-center gap-3 p-3 rounded-lg transition ${isActive("/signup")}`}
              >
                <FaUserPlus /> {isOpen && "Sign Up"}
              </button>
            </>
          )}

          {/* Settings */}
          <button
            onClick={() => navigate("/settings")}
            className={`flex items-center gap-3 p-3 rounded-lg transition ${isActive("/settings")}`}
          >
            <FaCog /> {isOpen && "Settings"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
