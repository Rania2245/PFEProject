import axios from "axios";
import { endpoint } from "../constants";
import { QuestionRequest } from "../types/questionrequest";

export const getRequests = async () => {
  return axios.get<QuestionRequest[]>(`${endpoint}`);
};

export const getRequestById = async (id: string) => {
  return axios.get<QuestionRequest>(`${endpoint}/${id}`);
};

export const deleteRequest = async (id: string) => {
  return axios.delete(`${endpoint}/${id}`);
};

export const modifyRequest = async (
  id: string,
  data: Partial<QuestionRequest>
) => {
  return axios.put(`${endpoint}/${id}`, data);
};

export const getRequestsByUserId = async (userId: string) => {
  return axios.get<QuestionRequest[]>(`${endpoint}?userId=${userId}`);
};

export const addRequest = async (formDate: QuestionRequest) => {
  return axios.post(`${endpoint}`, formDate);
};
