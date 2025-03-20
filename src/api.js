import axios from "axios";

const API_URL = "http://localhost:3001/api/v1"; // Remplacez par l'URL de votre backend

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/user/login`, credentials);
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};
