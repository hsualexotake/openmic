import React, { useEffect, useState } from "react";
import { getOpenMics } from "../api";
import AddMicForm from "../components/AddMicForm"; // Import new form component

const OpenMics = () => {
  const [mics, setMics] = useState([]);

  useEffect(() => {
    const fetchMics = async () => {
      const data = await getOpenMics();
      setMics(data);
    };
    fetchMics();
  }, []);

  const handleMicAdded = (newMic) => {
    setMics((prevMics) => [...prevMics, newMic]);
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-center py-10">
      <h1 className="text-4xl font-bold border-b-4 border-black pb-3 mb-6">
        🎤 NYC Open Mics
      </h1>

      {/* Add Mic Form - Only visible to admins later */}
      <AddMicForm onMicAdded={handleMicAdded} />

      {/* Display Open Mics */}
      <ul className="w-full max-w-3xl">
        {mics.length > 0 ? (
          mics.map((mic) => (
            <li key={mic.id} className="bg-white p-5 rounded-lg shadow-md mb-4 border border-gray-300">
              <h2 className="text-2xl font-semibold text-black">{mic.name}</h2>
              <p className="text-gray-600">📍 <span className="font-medium">{mic.location}, {mic.borough}</span></p>
              <p className="text-gray-800">💰 Cost: <span className="font-medium">{mic.cost}</span> | 🕒 Time: <span className="font-medium">{mic.time}</span> | 📅 Date: <span className="font-medium">{mic.date}</span></p>
              <p className="text-gray-700 mt-2">📝 Sign-up method: <span className="font-medium">{mic.sign_up_method}</span></p>
            </li>
          ))
        ) : (
          <p className="text-gray-600 text-lg">No open mics found.</p>
        )}
      </ul>
    </div>
  );
};

export default OpenMics;
