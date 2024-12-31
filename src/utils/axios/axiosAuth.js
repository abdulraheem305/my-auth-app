import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://67529d6ad1983b9597b6b5c0.mockapi.io",
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosGet = async (url, config = {}) => {
  try {
    const response = await apiClient.get(url, config);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const axiosPost = async (url, data, config = {}) => {
  try {
    const response = await apiClient.post(url, data, config);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const axiosPut = async (url, data, config = {}) => {
  try {
    const response = await apiClient.put(url, data, config);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const axiosPatch = async (url, data, config = {}) => {
  try {
    const response = await apiClient.patch(url, data, config);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

const handleAxiosError = (error) => {
  const errorMessage =
    error.response?.data?.message ||
    error.message ||
    "An unknown error occurred";
  console.error("Axios Error:", errorMessage);
  throw new Error(errorMessage);
};
