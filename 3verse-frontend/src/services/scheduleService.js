import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/api/schedules`;
const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getSchedules = async () => {
  const { data } = await axios.get(API, authHeader());
  return data;
};

export const getSchedule = async (id) => {
  const { data } = await axios.get(`${API}/${id}`, authHeader());
  return data;
};

export const updateSchedule = async (id, payload) => {
  const { data } = await axios.put(`${API}/${id}`, payload, authHeader());
  return data;
};

export const deleteSchedule = async (id) => {
  const { data } = await axios.delete(`${API}/${id}`, authHeader());
  return data;
};
