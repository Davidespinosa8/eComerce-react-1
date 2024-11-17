import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const checkout = async (info) => {
   const config = { headers: { 'Content-Type': 'application/json' } };
   return await axios.post(`${API_URL}/cart/checkout`, JSON.stringify(info), config);
};