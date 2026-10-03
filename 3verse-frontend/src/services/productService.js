import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/api/products`;
const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});
export const getProducts = async () => {
  const { data } = await axios.get(API);
  return data.products;
};

export const getProductBySlug = async (slug) => {
  const { data } = await axios.get(`${API}/slug/${slug}`);
  return data.product;
};



export const getAdminProducts = async () => {
  const { data } = await axios.get(API, authHeader());
  return data;
};

export const getProduct = async (id) => {
  const { data } = await axios.get(`${API}/${id}`);
  return data;
};

export const createProduct = async (payload) => {
  const formData = new FormData();

  Object.keys(payload).forEach((key) => {
    if (key === "thumbnail") {
      if (payload.thumbnail) {
        formData.append("image", payload.thumbnail);
      }
    } else if (
      key === "features" ||
      key === "gallery" ||
      key === "specifications"
    ) {
      formData.append(key, JSON.stringify(payload[key]));
    } else {
      formData.append(key, payload[key]);
    }
  });

  const { data } = await axios.post(API, formData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return data;
};

export const updateProduct = async (id, payload) => {
  const formData = new FormData();

  Object.keys(payload).forEach((key) => {
    if (key === "thumbnail") {
      if (payload.thumbnail instanceof File) {
        formData.append("image", payload.thumbnail);
      }
    } else if (
      key === "features" ||
      key === "gallery" ||
      key === "specifications"
    ) {
      formData.append(key, JSON.stringify(payload[key]));
    } else {
      formData.append(key, payload[key]);
    }
  });

  const { data } = await axios.put(`${API}/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return data;
};

export const deleteProduct = async (id) => {
  const { data } = await axios.delete(`${API}/${id}`, authHeader());

  return data;
};

