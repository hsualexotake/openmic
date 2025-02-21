import React, { useState } from "react";
import axios from "axios";

const MAPBOX_ACCESS_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const AddMicForm = ({ onMicAdded = () => {} }) => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    borough: "",
    cost: "",
    time: "",
    date: "",
    sign_up_method: "",
    latitude: "",
    longitude: "",
  });

  const [suggestions, setSuggestions] = useState([]);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === "location") {
      fetchAddressSuggestions(e.target.value);
    }
  };

  // Fetch address suggestions from Mapbox
  const fetchAddressSuggestions = async (query) => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    try {
      const API_URL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        query
      )}.json?access_token=${MAPBOX_ACCESS_TOKEN}&autocomplete=true&limit=5&country=US`;

      const response = await axios.get(API_URL);
      setSuggestions(response.data.features);
    } catch (error) {
      console.error("Error fetching address suggestions:", error);
      setSuggestions([]);
    }
  };

  // Handle suggestion selection
  const handleSuggestionClick = (suggestion) => {
    setFormData({
      ...formData,
      location: suggestion.place_name,
      latitude: suggestion.center[1],
      longitude: suggestion.center[0],
    });
    setSuggestions([]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token"); // Retrieve token from local storage

    if (!token) {
      alert("You must be logged in to add an open mic.");
      return;
    }

    try {
      const micData = { ...formData };

      const res = await fetch("http://localhost:5001/api/mics", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include token in request
        },
        body: JSON.stringify(micData),
      });

      if (res.ok) {
        alert("Open Mic Added!");
        const newMic = await res.json();
        onMicAdded(newMic);
      } else {
        const errorData = await res.json();
        alert("Error adding Open Mic: " + (errorData.error || "Unknown error"));
      }
    } catch (error) {
      console.error("Error submitting Open Mic:", error);
      alert("Error submitting Open Mic.");
    }
  };

  return (
    <div className="mb-6 p-6 bg-gray-100 shadow-md rounded-lg w-full max-w-lg">
      <h2 className="text-2xl font-semibold mb-4">Add a New Open Mic</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Open Mic Name"
          className="w-full p-2 border border-gray-300 rounded"
          required
        />

        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Full Address"
          className="w-full p-2 border border-gray-300 rounded"
          required
        />

        {/* Display Address Suggestions */}
        {suggestions.length > 0 && (
          <ul className="bg-white border border-gray-300 rounded shadow-md">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="p-2 cursor-pointer hover:bg-gray-200"
              >
                {suggestion.place_name}
              </li>
            ))}
          </ul>
        )}

        <input
          type="text"
          name="borough"
          value={formData.borough}
          onChange={handleChange}
          placeholder="Borough"
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="text"
          name="cost"
          value={formData.cost}
          onChange={handleChange}
          placeholder="Cost"
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="text"
          name="sign_up_method"
          value={formData.sign_up_method}
          onChange={handleChange}
          placeholder="Sign-up Method"
          className="w-full p-2 border border-gray-300 rounded"
          required
        />

        <button
          type="submit"
          className="mt-4 w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
        >
          Add Open Mic
        </button>
      </form>
    </div>
  );
};

export default AddMicForm;
