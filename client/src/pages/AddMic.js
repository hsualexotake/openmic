import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddMicForm from "../components/AddMicForm";

const AddMic = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login"); // Redirect if not logged in
      return;
    }

    const decodeToken = () => {
      try {
        const payload = JSON.parse(atob(token.split(".")[1])); // Decode JWT
        setIsAdmin(payload.role === "admin"); // Ensure user is an admin
      } catch (error) {
        console.error("Invalid token", error);
        localStorage.removeItem("token"); // Remove invalid token
        navigate("/login"); // Redirect to login
      }
    };

    decodeToken();
  }, [token, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Add a New Open Mic</h1>
      {isAdmin ? (
        <AddMicForm />
      ) : (
        <p className="text-red-500">You must be an admin to add open mics.</p>
      )}
    </div>
  );
};

export default AddMic;
