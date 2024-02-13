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

    const requests = response.data.map((request) => ({
      ...request,
      question: request.question.map((q) => ({
        id: q.id,
        text: q.text,
      })),
      response: request.response.map((r) => ({
        id: r.id,
        text: r.text,
      })),
    }));

    return requests;
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
export const findRequest = async (question: string) => {
  try {
    const response = await axios.get<QuestionRequest[]>(
      `${endpoint}/api/searchcustomRequests/search?question=${encodeURIComponent(
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
