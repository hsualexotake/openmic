import React, { useState } from "react";

const AddMicForm = ({ onMicAdded }) => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    borough: "",
    cost: "",
    time: "",
    date: "",
    sign_up_method: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5001/api/mics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert("Open Mic Added!");
      const newMic = await response.json();
      onMicAdded(newMic); // Notify the parent component (OpenMics.js)
      setFormData({
        name: "",
        location: "",
        borough: "",
        cost: "",
        time: "",
        date: "",
        sign_up_method: "",
      });
    } else {
      alert("Error adding Open Mic.");
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
          placeholder="Location"
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
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
