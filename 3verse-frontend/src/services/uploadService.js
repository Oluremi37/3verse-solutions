import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/api/upload`;

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "multipart/form-data",
  },
});

export const uploadImage = async (file) => {
  const formData = new FormData();

  formData.append("image", file);

  const { data } = await axios.post(API, formData, authHeader());

  return data.image;
};
