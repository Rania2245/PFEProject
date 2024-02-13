import axios from "axios";
import { endpoint } from "../constants";
import { Question } from "../types/question";

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

export const getQuestion = async () => {
  try {
    const response = await axios.get<Question[]>(
      `${endpoint}/api/questions`,
      getAxiosConfig()
    );
    const questions = response.data.map((question) => ({
      ...question,
    }));
    return questions;
  } catch (error) {
    console.error("Error fetching questions", error);
    throw error;
  }
};
export const getQuestionById = async (id: number) => {
  try {
    const response = await axios.get<Question>(
      ` ${endpoint}/api/questions/${id}`,
      getAxiosConfig()
    );
    return response.data;
  } catch (error) {
    console.error(`error detecting the question with th id : ${id}`, error);
    throw error;
  }
};

export const deleteQuestion = async (id: number) => {
  try {
    await axios.delete(` ${endpoint}/api/questions/${id}`, getAxiosConfig());
  } catch (error) {
    console.error(`Error deleting with the id ${id}:`, error);
    throw error;
  }
};

export const modifyQuestion = async (id: number) => {
  try {
    await axios.put(`${endpoint}/api/questions/${id}`, getAxiosConfig());
  } catch (error) {
    console.error(`Error modifying with the id ${id}:`, error);
    throw error;
  }
};

export const addQuestion = async (FormData: Question[]) => {
  try {
    await axios.post(`${endpoint}/api/questions`, FormData, getAxiosConfig());
  } catch (error) {
    console.error("error adding qustion", error);
    throw error;
  }
};
