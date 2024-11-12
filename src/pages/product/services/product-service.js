import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const config = { headers: { 'Content-Type': 'application/json' } };

export const getProducts = async () => {
   return await axios.get(`${API_URL}/products`);
};

export const getProductsSearch = async (search) =>{
   return await axios.get(`${API_URL}/products/search?search=${search}`);
}