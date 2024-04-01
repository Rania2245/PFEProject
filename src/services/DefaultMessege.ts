import axios from "axios";
import { endpoint } from "../constants";
import { DefaultMessage } from "../types/defaultMessege";

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

export const duplicateDefaultMessage = async (id: number) => {
  try {
    const response = await axios.post<DefaultMessage>(
      `${endpoint}/api/defaultMessages/${id}/duplicate`,
      {},
      getAxiosConfig()
    );
    return response.data;
  } catch (error) {
    console.error(`Error duplicating default message with ID ${id}: `, error);
    throw error;
  }
};

export const getDefaultMessageById = async (id: number) => {
  try {
    const response = await axios.get<DefaultMessage>(
      `${endpoint}/api/defaultMessages/${id}`,
      getAxiosConfig()
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching default message with ID ${id}: `, error);
    throw error;
  }
};

export const createDefaultMessage = async (
  defaultMessageData: DefaultMessage
) => {
  try {
    const response = await axios.post<DefaultMessage>(
      `${endpoint}/api/defaultMessages`,
      defaultMessageData,
      getAxiosConfig()
    );
    return response.data;
  } catch (error) {
    console.error("Error creating default message: ", error);
    throw error;
  }
};

export const updateDefaultMessage = async (
  id: number,
  defaultMessageData: DefaultMessage
) => {
  try {
    await axios.put(
      `${endpoint}/api/defaultMessages/${id}`,
      defaultMessageData,
      getAxiosConfig()
    );
  } catch (error) {
    console.error(`Error updating default message with ID ${id}: `, error);
    throw error;
  }
};

export const deleteDefaultMessage = async (id: number) => {
  try {
    await axios.delete(
      `${endpoint}/api/defaultMessages/${id}`,
      getAxiosConfig()
    );
  } catch (error) {
    console.error(`Error deleting default message with ID ${id}: `, error);
    throw error;
  }
};

export const getAllDefaultMessages = async () => {
  try {
    const response = await axios.get<DefaultMessage[]>(
      `${endpoint}/api/defaultMessages`,
      getAxiosConfig()
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching all default messages: ", error);
    throw error;
  }
};
