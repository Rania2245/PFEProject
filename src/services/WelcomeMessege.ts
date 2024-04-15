import axios from "axios";
import { endpoint } from "../constants";
import { WelcomeMessage } from "../types/WelcomeMessege";

const getAxiosConfig = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  } else {
    throw new Error("JWT token not found in localStorage");
  }
};

export const duplicateWelcomeMessage = async (id: number) => {
  try {
    const response = await axios.post<WelcomeMessage>(
      `${endpoint}/api/welcomeMessages/${id}/duplicate`,
      {},
      getAxiosConfig()
    );
    return response.data;
  } catch (error) {
    console.error(`Error duplicating welcome message with ID ${id}: `, error);
    throw error;
  }
};

export const getWelcomeMessageById = async (id: number) => {
  try {
    const response = await axios.get<WelcomeMessage>(
      `${endpoint}/api/welcomeMessages/${id}`,
      getAxiosConfig()
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching welcome message with ID ${id}: `, error);
    throw error;
  }
};

export const createWelcomeMessage = async (
  welcomeMessageData: WelcomeMessage
) => {
  try {
    const response = await axios.post<WelcomeMessage>(
      `${endpoint}/api/welcomeMessages`,
      welcomeMessageData,
      getAxiosConfig()
    );
    return response.data;
  } catch (error) {
    console.error("Error creating welcome message: ", error);
    throw error;
  }
};

export const updateWelcomeMessage = async (
  id: number,
  welcomeMessageData: WelcomeMessage
) => {
  try {
    await axios.put(
      `${endpoint}/api/welcomeMessages/${id}`,
      welcomeMessageData,
      getAxiosConfig()
    );
  } catch (error) {
    console.error(`Error updating welcome message with ID ${id}: `, error);
    throw error;
  }
};

export const deleteWelcomeMessage = async (id: number) => {
  try {
    await axios.delete(
      `${endpoint}/api/welcomeMessages/${id}`,
      getAxiosConfig()
    );
  } catch (error) {
    console.error(`Error deleting welcome message with ID ${id}: `, error);
    throw error;
  }
};

export const getWelcomeMessage = async () => {
  try {
    const response = await axios.get<WelcomeMessage[]>(
      `${endpoint}/api/welcomeMessages`,
      getAxiosConfig()
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching all welcome messages: ", error);
    throw error;
  }
};
