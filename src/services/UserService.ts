import axios from "axios";
import { endpoint } from "../constants";
import { User } from "../types/user";

export const loginUser = async (email: string, password: string) => {
  try {
    const { data } = await axios.post(`${endpoint}/api/login`, {
      email,
      password,
    });
    // Assuming the response contains a 'token' and 'roles' property
    return {
      token: data.token,
      roles: data.roles,
    };
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
export const getUserById = async (userId: string) => {
  try {
    const token = localStorage.getItem("token");
    const { data } = await axios.get(`${endpoint}/api/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw error;
  }
};

export const forgotPassword = async (useremail: string) => {
  try {
    const response = await axios.post(`${endpoint}/api/password/email`, {
      email: useremail,
    });
    return response.data;
  } catch (error) {
    console.error("Error sending reset password email:", error);
    throw new Error("Error sending reset password email");
  }
};
export const resetPassword = async (
  email: string,
  password: string,
  confirmPassword: string,
  token: string
) => {
  try {
    const response = await axios.post(`${endpoint}/api/password/reset`, {
      email,
      password,
      password_confirmation: confirmPassword,
      token,
    });

    return response.data;
  } catch (error) {
    console.error("Error resetting password:", error);
    throw new Error("Error resetting password");
  }
};
