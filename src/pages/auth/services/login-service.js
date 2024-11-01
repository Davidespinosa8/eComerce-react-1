import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const login = async (info) => {
   const config = { headers: { 'Content-Type': 'application/json' } };
   return await axios.post(`${API_URL}/auth/login`, JSON.stringify(info), config);
}