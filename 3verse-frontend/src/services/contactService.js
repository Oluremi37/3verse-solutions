import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/api/contacts`;
const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getContacts = async () => {
  const { data } = await axios.get(API, authHeader());
  return data;
};

export const getContact = async (id) => {
  const { data } = await axios.get(`${API}/${id}`, authHeader());
  return data;
};

export const markAsRead = async (id) => {
  const { data } = await axios.put(`${API}/${id}/read`, {}, authHeader());
  return data;
};

export const deleteContact = async (id) => {
  const { data } = await axios.delete(`${API}/${id}`, authHeader());
  return data;
};
