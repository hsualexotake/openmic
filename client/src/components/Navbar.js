import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ token, setToken }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("Logging out..."); // Debugging logout
    localStorage.removeItem("token"); // Remove token from storage
    setToken(null); // Update state to reflect logout
    navigate("/login"); // Redirect to login page
  };

  return (
    <nav className="flex justify-between p-4 bg-gray-200 shadow-md">
      <h1
        className="text-xl font-bold cursor-pointer"
        onClick={() => navigate("/")}
      >
        🎤 NYC Open Mics
      </h1>
      <div>
        {token ? (
          <>
            <button
              onClick={() => navigate("/add-mic")}
              className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
            >
              Add Open Mic
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => navigate("/login")}
              className="bg-green-500 text-white px-4 py-2 rounded mr-2"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Sign Up
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
