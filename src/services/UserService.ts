import axios from "axios";
import { endpoint } from "../constants";
import { User } from "../types/user";

export const loginUser = async (email: string, password: string) => {
  try {
    const { data } = await axios.post(`${endpoint}/api/login`, {
      email,
      password,
    });
    return data.token;
  } catch (error) {
    console.error("error logging in :", error);
    throw error;
  }
};
export const addUser = async (formData: User) => {
  try {
    const response = await axios.post(`${endpoint}/api/register`, formData);
    return response.data;
  } catch (error) {
    console.error("Error when adding user:", error);
    throw error;
  }
};

export const getUsersEmail = async () => {
  try {
    const token = localStorage.getItem("token");
    const { data } = await axios.get(`${endpoint}/api/emails`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.error("Error fetching user emails:", error);
    throw error;
  }
};
