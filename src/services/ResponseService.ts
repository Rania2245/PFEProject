import axios from "axios";
import { endpoint } from "../constants";
import { Response } from "../types/response";

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

export const getResponse = async () => {
  try {
    const response = await axios.get<Response[]>(
      `${endpoint}/api/responses`,
      getAxiosConfig()
    );
    const responses = response.data.map((question) => ({
      ...question,
    }));
    return responses;
  } catch (error) {
    console.error("Error fetching responses", error);
    throw error;
  }
};
export const getResponsesById = async (id: number) => {
  try {
    const response = await axios.get<Response>(
      ` ${endpoint}/api/responses/${id}`,
      getAxiosConfig()
    );
    return response.data;
  } catch (error) {
    console.error(`error detecting the responses with th id : ${id}`, error);
    throw error;
  }
};

export const deleteResponses = async (id: number) => {
  try {
    await axios.delete(` ${endpoint}/api/responses/${id}`, getAxiosConfig());
  } catch (error) {
    console.error(`Error deleting responses with the id ${id}:`, error);
    throw error;
  }
};

export const modifyResponses = async (id: number) => {
  try {
    await axios.put(`${endpoint}/api/responses/${id}`, getAxiosConfig());
  } catch (error) {
    console.error(`Error responses with the id ${id}:`, error);
    throw error;
  }
};

export const addResponse = async (FormData: Response[]) => {
  try {
    await axios.post(`${endpoint}/api/responses`, FormData, getAxiosConfig());
  } catch (error) {
    console.error("error adding responses", error);
    throw error;
  }
};
