import axios from "axios";
import { endpoint } from "../constants";

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
