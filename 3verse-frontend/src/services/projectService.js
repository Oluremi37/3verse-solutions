import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/api/projects`;
const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

const buildFormData = (form) => {
  const formData = new FormData();

  Object.entries(form).forEach(([key, value]) => {
    if (key === "coverImage") {
      if (value instanceof File) {
        formData.append("coverImage", value);
      }
      return;
    }

    if (key === "gallery") {
      value.forEach((file) => {
        if (file instanceof File) {
          formData.append("gallery", file);
        }
      });
      return;
    }

    if (value !== undefined && value !== null) {
      formData.append(key, value);
    }
  });

  return formData;
};

export const getProjects = async () => {
  const { data } = await axios.get(API, authHeader());
  return data;
};

export const getProject = async (slug) => {
  const { data } = await axios.get(`${API}/${slug}`, authHeader());
  return data;
};

export const createProject = async (form) => {
  const formData = buildFormData(form);

  const { data } = await axios.post(API, formData, {
    headers: {
      ...authHeader().headers,
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

export const updateProject = async (id, form) => {
  const formData = buildFormData(form);

  const { data } = await axios.put(`${API}/${id}`, formData, {
    headers: {
      ...authHeader().headers,
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

export const deleteProject = async (id) => {
  const { data } = await axios.delete(`${API}/${id}`, authHeader());
  return data;
};
