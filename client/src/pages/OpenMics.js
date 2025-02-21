import React, { useEffect, useState, useRef } from "react";
import { FaMapMarkerAlt, FaMoneyBillWave, FaClock, FaCalendar, FaMicrophone, FaSort } from "react-icons/fa";
import OpenMicMap from "../components/OpenMicMap";

const OpenMics = () => {
  const [mics, setMics] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedMic, setSelectedMic] = useState(null);
  const micRefs = useRef({});

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

  useEffect(() => {
    if (selectedMic && micRefs.current[selectedMic.id]) {
      micRefs.current[selectedMic.id].scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [selectedMic]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-white p-6">
      <div className="flex flex-grow max-w-[95%] w-full bg-white rounded-2xl overflow-hidden">
        <div className="flex flex-grow">
          {/* Mic List */}
          <div className="w-1/3 bg-white p-6 overflow-y-auto h-[calc(100vh-100px)] border-r border-gray-300">
            <div className="flex justify-between items-center mb-4">
              <select className="p-2 border border-gray-300 rounded-lg text-gray-700">
                <option>📍 All Locations</option>
                <option>Manhattan</option>
                <option>Brooklyn</option>
                <option>Queens</option>
                <option>Bronx</option>
                <option>Staten Island</option>
              </select>

              <button className="p-2 bg-gray-200 rounded-lg flex items-center gap-2 hover:bg-gray-300">
                <FaSort />
                <span>Sort</span>
              </button>
            </div>

            {mics.length === 0 ? (
              <p>No open mics available at the moment.</p>
            ) : (
              <div className="space-y-6">
                {mics.map((mic) => (
                  <div
                    key={mic.id}
                    ref={(el) => (micRefs.current[mic.id] = el)}
                    className={`p-6 rounded-xl shadow-md border transition-all duration-300 ${
                      selectedMic?.id === mic.id
                        ? "border-purple-500 shadow-[0_0_12px_rgba(125,95,255,0.9)] scale-[1.02] max-w-full"
                        : "border-gray-200"
                    } hover:bg-gray-50 cursor-pointer`}
                    style={{ width: "100%" }} // Ensures cards stay within bounds
                    onClick={() => setSelectedMic(mic)}
                  >
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">{mic.name}</h2>

                    <div className="text-gray-700 space-y-2">
                      <p className="flex items-center gap-2">
                        <FaMapMarkerAlt className="text-red-500" />
                        <span>{mic.location} | {mic.borough}</span>
                      </p>
                      <p className="flex items-center gap-2">
                        <FaMoneyBillWave className="text-green-500" />
                        <span>{mic.cost === 0 ? "Free" : `$${mic.cost}`}</span>
                      </p>
                      <p className="flex items-center gap-2">
                        <FaClock className="text-blue-500" />
                        <span>{mic.time}</span>
                      </p>
                      <p className="flex items-center gap-2">
                        <FaCalendar className="text-purple-500" />
                        <span>{mic.date}</span>
                      </p>
                      <p className="flex items-center gap-2">
                        <FaMicrophone className="text-orange-500" />
                        <span>{mic.sign_up_method}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Map Section (Expanded) */}
          <div className="w-2/3 p-4">
            <div className="h-[calc(100vh-100px)] rounded-2xl overflow-hidden shadow-md">
              <OpenMicMap mics={mics} selectedMic={selectedMic} setSelectedMic={setSelectedMic} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpenMics;
