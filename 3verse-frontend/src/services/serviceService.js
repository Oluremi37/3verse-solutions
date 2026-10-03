import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/api/services`;

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});
export const getServices = async () => {
  const { data } = await axios.get(API);
  return data;
};

export const getServiceBySlug = async (slug) => {
  const { data } = await axios.get(`${API}/slug/${slug}`);
  return data.service;
};
export const getAdminServices = async () => {
  const { data } = await axios.get(API, authHeader());
  return data;
};

export const getService = async (id) => {
  const { data } = await axios.get(`${API}/${id}`);
  return data;
};

export const createService = async (payload) => {
  const { data } = await axios.post(API, payload, authHeader());
  return data;
};

export const updateService = async (id, payload) => {
  const { data } = await axios.put(`${API}/${id}`, payload, authHeader());

  return data;
};

export const deleteService = async (id) => {
  const { data } = await axios.delete(`${API}/${id}`, authHeader());

  return data;
};