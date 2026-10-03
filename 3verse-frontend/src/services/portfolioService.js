import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/portfolios`,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// =======================
// PUBLIC
// =======================

export const getPortfolioProjects = async () => {
  const response = await API.get("/");
  return response.data;
};

export const getPortfolioProject = async (id) => {
  const response = await API.get(`/${id}`);
  return response.data;
};

// =======================
// ADMIN
// =======================

export const getPortfolios = async () => {
  const { data } = await API.get("/");
  return data;
};

export const getPortfolio = async (id) => {
  const { data } = await API.get(`/${id}`);
  return data;
};

export const createPortfolio = async (formData) => {
  const { data } = await API.post("/", formData);
  return data;
};

export const updatePortfolio = async (id, formData) => {
  const { data } = await API.put(`/${id}`, formData);
  return data;
};

export const deletePortfolio = async (id) => {
  const { data } = await API.delete(`/${id}`);
  return data;
};
