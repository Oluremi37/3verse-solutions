import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/api/quotes`;
const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getQuotes = async () => {
  const { data } = await axios.get(API, authHeader());
  return data;
};

export const getQuote = async (id) => {
  const { data } = await axios.get(`${API}/${id}`, authHeader());
  return data;
};

export const updateQuote = async (id, payload) => {
  const { data } = await axios.put(`${API}/${id}`, payload, authHeader());

  return data;
};

export const deleteQuote = async (id) => {
  const { data } = await axios.delete(`${API}/${id}`, authHeader());

  return data;
};
