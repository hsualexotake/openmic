import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold text-green-500 mb-4">
        Welcome to NYC Open Mics!
      </h1>
      <p className="text-lg text-gray-700 max-w-lg text-center">
        Discover, sign up, and showcase your talent at the best open mic nights in NYC!
      </p>
      <div className="mt-6">
        <button
          className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-xl shadow-lg hover:bg-blue-400 transition duration-300 mx-2"
          onClick={() => navigate("/mics")}
        >
          View Open Mics
        </button>
        <button
          className="px-6 py-3 bg-gray-500 text-white font-semibold rounded-xl shadow-lg hover:bg-gray-400 transition duration-300 mx-2"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Home;
