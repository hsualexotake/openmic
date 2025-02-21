import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const OpenMics = () => {
  const [mics, setMics] = useState([]);
  const token = localStorage.getItem("token"); // No need for useState
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMics = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/mics");
        const data = await response.json();
        setMics(data);
      } catch (error) {
        console.error("Error fetching open mics:", error);
      }
    };

    fetchMics();

    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1])); // Decode JWT
        setIsAdmin(payload.role === "admin");
      } catch (error) {
        console.error("Error decoding token", error);
        setIsAdmin(false);
      }
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-4">🎤 NYC Open Mics</h1>

      {/* Login or Add Mic Button */}
      <div className="mb-4">
        {!token ? (
          <button
            onClick={() => navigate("/login")}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            🔑 Login
          </button>
        ) : isAdmin ? (
          <button
            onClick={() => navigate("/add-mic")}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            ➕ Add Open Mic
          </button>
        ) : null}
      </div>

      {/* Display Open Mics */}
      <ul>
        {mics.length > 0 ? (
          mics.map((mic) => (
            <li key={mic.id} className="border p-4 mb-2 w-full max-w-lg">
              <h2 className="text-xl font-semibold">{mic.name}</h2>
              <p>
                📍 {mic.location} | 🏙 {mic.borough}
              </p>
              <p>
                💰 {mic.cost === 0 ? "Free" : `$${mic.cost}`} | 🕒 {mic.time}
              </p>
              <p>
                📅 {mic.date} | 🎤 {mic.sign_up_method}
              </p>
            </li>
          ))
        ) : (
          <p>No open mics available.</p>
        )}
      </ul>
    </div>
  );
};

export default OpenMics;
