import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api/",
  timeout: 5000,
});

export const createUser = async (userData) => {
  try {
    const response = await axiosInstance.post("create-user/", userData);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.error || "Erro ao criar usuário");
    } else {
      throw new Error("Erro de comunicação com a API");
    }
  }
};
