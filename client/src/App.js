import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar"; // Ensure correct path
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import OpenMics from "./pages/OpenMics";
import AddMic from "./pages/AddMic"; // Add Mic page

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const updateToken = () => setToken(localStorage.getItem("token"));
    window.addEventListener("storage", updateToken);
    return () => window.removeEventListener("storage", updateToken);
  }, []);

  return (
    <Router>
      <Navbar token={token} setToken={setToken} /> {/* ✅ Add Navbar Here */}
      <Routes>
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/mics" element={<OpenMics />} />
        <Route
          path="/add-mic"
          element={token ? <AddMic /> : <Navigate to="/login" />}
        />
        <Route path="/" element={<OpenMics />} />
      </Routes>
    </Router>
  );
};

export default App;
