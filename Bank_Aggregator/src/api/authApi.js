// src/api/authApi.js
import axios from "axios";

const API_URL = "http://localhost:5031/api"; // Backend API port

export const loginApi = async (email, password) => {
  try {
    const res = await axios.post(`${API_URL}/Auth/login`, { email, password });
    return res.data; // { accessToken, refreshToken, user }
  } catch (err) {
    console.error(err);
    return null;
  }
};
