import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://675bdaee9ce247eb19379fb4.mockapi.io/movies",
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

export const axiosDelete = async (url, config = {}) => {
  try {
    const response = await apiClient.delete(url, config);
    console.log("Delete response:", response);
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
