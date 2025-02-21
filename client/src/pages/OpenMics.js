import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import OpenMicMap from "../components/OpenMicMap"; // Updated import

const OpenMics = () => {
  const [mics, setMics] = useState([]);
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
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-4">🎤 NYC Open Mics</h1>

      {/* If no mics exist, display fallback message */}
      {mics.length === 0 ? (
        <p>No open mics available at the moment.</p>
      ) : (
        <>
          {/* Map showing all open mic locations */}
          <OpenMicMap mics={mics} />

          {/* Display Open Mic Details */}
          <ul className="w-full max-w-2xl">
            {mics.map((mic) => (
              <li key={mic.id} className="border p-4 mb-2 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold">{mic.name}</h2>
                <p>📍 {mic.location} | 🏙 {mic.borough}</p>
                <p>💰 {mic.cost === 0 ? "Free" : `$${mic.cost}`} | 🕒 {mic.time}</p>
                <p>📅 {mic.date} | 🎤 {mic.sign_up_method}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default OpenMics;
