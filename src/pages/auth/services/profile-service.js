import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const profileUpdate = async (id, info) => {
    const config = { headers: { 'Content-Type': 'application/json' } };
    return await axios.post(`${API_URL}/user/${id}/update`, JSON.stringify(info), config);
};