import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5001/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, role }),
    });

    const data = await response.json();
    if (response.ok) {
      alert("User created successfully! You can now log in.");
      navigate("/login"); // ✅ Redirect after signup
    } else {
      alert("Signup failed: " + data.error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Sign Up</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="user">Regular User</option>
          <option value="admin">Admin</option>
        </select>

        <button type="submit" className="bg-blue-500 text-white p-2">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
