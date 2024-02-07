import axios from "axios";
import { endpoint } from "../constants";
import { QuestionRequest } from "../types/questionrequest";

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

export const getRequests = async () => {
  try {
    const response = await axios.get<QuestionRequest[]>(
      `${endpoint}/api/customRequests`,
      getAxiosConfig()
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching requests: ", error);
    throw error;
  }
};

export const getRequestById = async (id: number) => {
  try {
    const response = await axios.get<QuestionRequest>(
      `${endpoint}/api/customRequests/${id}`,
      getAxiosConfig()
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching request with ID ${id}: `, error);
    throw error;
  }
};

export const deleteRequest = async (id: number) => {
  try {
    await axios.delete(
      `${endpoint}/api/customRequests/${id}`,
      getAxiosConfig()
    );
  } catch (error) {
    console.error(`Error deleting request with ID ${id}: `, error);
    throw error;
  }
};

export const modifyRequest = async (
  id: number,
  data: Partial<QuestionRequest>
) => {
  try {
    await axios.put(
      `${endpoint}/api/customRequests/${id}`,
      data,
      getAxiosConfig()
    );
  } catch (error) {
    console.error(`Error modifying request with ID ${id}: `, error);
    throw error;
  }
};

export const getRequestsByUserId = async (userId: string) => {
  try {
    const response = await axios.get<QuestionRequest[]>(
      `${endpoint}/api/customRequests?userId=${userId}`,
      getAxiosConfig()
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching requests for user ID ${userId}: `, error);
    throw error;
  }
};

export const addRequest = async (formData: QuestionRequest) => {
  try {
    await axios.post(
      `${endpoint}/api/customRequests`,
      formData,
      getAxiosConfig()
    );
  } catch (error) {
    console.error("Error adding request: ", error);
    throw error;
  }


};
