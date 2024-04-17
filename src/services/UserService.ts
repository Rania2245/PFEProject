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
    console.error("Error logging in:", error);
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

export const getAllUsers = async () => {
  try {
    const token = localStorage.getItem("token");
    const { data } = await axios.get(`${endpoint}/api/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.error("Error fetching all users:", error);
    throw error;
  }
};

export const updateUser = async (userId: string, formData: User) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(
      `${endpoint}/api/users/${userId}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

export const deleteUser = async (userId: string) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.delete(`${endpoint}/api/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};
