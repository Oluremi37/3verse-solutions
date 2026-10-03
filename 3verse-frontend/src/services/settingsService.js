import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/api/settings`;
const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

// Change password
export const changePassword = async (payload) => {
  const { data } = await axios.patch(
    `${API}/change-password`,
    payload,
    authHeader(),
  );

  return data;
};

// Update admin profile
export const updateProfile = async (payload) => {
  const { data } = await axios.patch(`${API}/profile`, payload, authHeader());

  return data;
};
