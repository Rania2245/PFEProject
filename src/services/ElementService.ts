import axios from "axios";
import { endpoint } from "../constants";
import { Element } from "../types/Element";

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

export const getElementById = async (id: number) => {
  try {
    const response = await axios.get<Element>(
      `${endpoint}/api/elements/${id}`,
      getAxiosConfig()
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching element with ID ${id}: `, error);
    throw error;
  }
};

export const createElement = async (elementData: Element) => {
  try {
    const response = await axios.post<Element>(
      `${endpoint}/api/elements`,
      elementData,
      getAxiosConfig()
    );
    return response.data;
  } catch (error) {
    console.error("Error creating element: ", error);
    throw error;
  }
};

export const updateElement = async (id: number, elementData: Element) => {
  try {
    await axios.put(
      `${endpoint}/api/elements/${id}`,
      elementData,
      getAxiosConfig()
    );
  } catch (error) {
    console.error(`Error updating element with ID ${id}: `, error);
    throw error;
  }
};

export const deleteElement = async (id: number) => {
  try {
    await axios.delete(`${endpoint}/api/elements/${id}`, getAxiosConfig());
  } catch (error) {
    console.error(`Error deleting element with ID ${id}: `, error);
    throw error;
  }
};
