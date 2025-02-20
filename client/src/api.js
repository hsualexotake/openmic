import axios from "axios";

const API_URL = "http://localhost:5001/api/mics"; // Connects to backend

export const getOpenMics = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching open mics:", error);
    return [];
  }
};
