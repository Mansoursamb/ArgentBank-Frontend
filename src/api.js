import axios from "axios";

const API_URL = "http://localhost:3001/api/v1";

export const loginUser = async (credentials) => {
  const response = await axios.post(`${API_URL}/user/login`, credentials);
  return response.data.body;
};

export const fetchUser = async (token) => {
  const response = await axios.get(`${API_URL}/user/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.body;
};

export const updateUser = async (data, token) => {
  const response = await axios.put(`${API_URL}/user/profile`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.body;
};
