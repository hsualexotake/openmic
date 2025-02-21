import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home"; // ✅ Import Home Page
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import OpenMics from "./pages/OpenMics";
import AddMic from "./pages/AddMic";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const updateToken = () => setToken(localStorage.getItem("token"));
    window.addEventListener("storage", updateToken);
    return () => window.removeEventListener("storage", updateToken);
  }, []);

  return (
    <Router>
      <div className="flex transition-all duration-300">
        <Navbar
          token={token}
          setToken={setToken}
          isOpen={isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
        />

        <div
          className={`flex-grow transition-all duration-300 ${
            isSidebarOpen ? "ml-64" : "ml-16"
          }`}
        >
          <Routes>
            <Route path="/" element={<Home />} /> {/* ✅ Home Page */}
            <Route path="/mics" element={<OpenMics />} />
            <Route path="/login" element={<Login setToken={setToken} />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/add-mic"
              element={token ? <AddMic /> : <Navigate to="/login" />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
