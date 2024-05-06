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

export const generateAI = async (data: any) => {
  try {
    const response = await axios.put(
      `${endpoint}/api/question-requests`,
      data,
      getAxiosConfig()
    );
    console.log("Request generated successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error generating the request using AI:", error);
    throw error;
  }
};
export const modifyRequest = async (
  id: number,
  data: Partial<QuestionRequest>
) => {
  try {
    await axios.put(
      `${endpoint}/api/question-requests/${id}`,
      data,
      getAxiosConfig()
    );
  } catch (error) {
    console.error(`Error modifying request with ID ${id}: `, error);
    throw error;
  }
};
export const getRequests = async () => {
  try {
    const response = await axios.get<QuestionRequest[]>(
      `${endpoint}/api/question-requests`,
      getAxiosConfig()
    );

    const requests = response.data.map((request) => ({
      ...request,
    }));

    return requests;
  } catch (error) {
    console.error("Error fetching requests: ", error);
    throw error;
  }
};

export const getRequestById = async (id: number) => {
  try {
    const response = await axios.get<{ data: QuestionRequest }>(
      `${endpoint}/api/question-requests/${id}`,
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
      `${endpoint}/api/question-requests/${id}`,
      getAxiosConfig()
    );
  } catch (error) {
    console.error(`Error deleting request with ID ${id}: `, error);
    throw error;
  }
};

export const addRequest = async (formData: any) => {
  try {
    const transformedData = {
      ...formData,
      partage: formData.partage.map((item: any) => ({
        type: item.type,
        value: item.value,
      })),
    };
    await axios.post(
      `${endpoint}/api/question-requests`,
      transformedData,
      getAxiosConfig()
    );
  } catch (error) {
    console.error("Error adding request: ", error);
    throw error;
  }
};

export const findRequest = async (question: string) => {
  try {
    const response = await axios.get<QuestionRequest[]>(
      `${endpoint}/api/questionrequests/searching?question=${encodeURIComponent(
        question
      )}`,
      getAxiosConfig()
    );
    return response.data;
  } catch (error) {
    console.error(`Can't find the question "${question}": `, error);
    throw error;
  }
};
