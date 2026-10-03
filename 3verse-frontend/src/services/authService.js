import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/auth`,
});

export const loginAdmin = async (email, password) => {
  const response = await API.post("/login", {
    email,
    password,
  });

  return response.data;
};
