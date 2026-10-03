import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/api/teams`;
const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "multipart/form-data",
  },
});

// Get All Team Members
export const getTeamMembers = async () => {
  const { data } = await axios.get(API);
  return data;
};

// Get Single Team Member
export const getTeamMember = async (id) => {
  const { data } = await axios.get(`${API}/${id}`);
  return data;
};


// Create Team Member
export const createTeamMember = async (formData) => {
  const { data } = await axios.post(API, formData, authHeader());
  return data;
};

// Update Team Member
export const updateTeamMember = async (id, formData) => {
  const { data } = await axios.put(`${API}/${id}`, formData, authHeader());

  return data;
};

// Delete Team Member
export const deleteTeamMember = async (id) => {
  const { data } = await axios.delete(`${API}/${id}`, authHeader());

  return data;
};



// Get all team members
export const getTeamAdminMembers = async () => {
  const { data } = await axios.get(API, authHeader());
  return data;
};

// Get single team member
export const getTeamAdminMember = async (id) => {
  const { data } = await axios.get(`${API}/${id}`, authHeader());
  return data;
};

// Create team member
export const createTeamAdminMember = async (formData) => {
  const { data } = await axios.post(API, formData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

// Update team member
export const updateTeamAdminMember = async (id, formData) => {
  const { data } = await axios.put(`${API}/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

// Delete team member
export const deleteTeamAdminMember = async (id) => {
  const { data } = await axios.delete(`${API}/${id}`, authHeader());
  return data;
};

