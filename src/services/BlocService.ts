import axios from "axios";
import { endpoint } from "../constants";
import { Bloc } from "../types/Bloc";

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
export const duplicateBloc = async (id: number) => {
  try {
    const response = await axios.post<Bloc>(
      `${endpoint}/api/blocs/${id}/duplicate`,
      {},
      getAxiosConfig()
    );
    return response.data;
  } catch (error) {
    console.error(`Error duplicating bloc with ID ${id}: `, error);
    throw error;
  }
};

export const getBlocById = async (id: number) => {
  try {
    const response = await axios.get<Bloc>(
      `${endpoint}/api/blocs/${id}`,
      getAxiosConfig()
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching bloc with ID ${id}: `, error);
    throw error;
  }
};

export const createBloc = async (blocData: Bloc) => {
  try {
    const response = await axios.post<Bloc>(
      `${endpoint}/api/blocs`,
      blocData,
      getAxiosConfig()
    );
    return response.data;
  } catch (error) {
    console.error("Error creating bloc: ", error);
    throw error;
  }
};

export const updateBloc = async (id: number, blocData: Bloc) => {
  try {
    await axios.put(`${endpoint}/api/blocs/${id}`, blocData, getAxiosConfig());
  } catch (error) {
    console.error(`Error updating bloc with ID ${id}: `, error);
    throw error;
  }
};

export const deleteBloc = async (id: Number) => {
  try {
    await axios.delete(`${endpoint}/api/blocs/${id}`, getAxiosConfig());
  } catch (error) {
    console.error(`Error deleting bloc with ID ${id}: `, error);
    throw error;
  }
};
export const getAllBlocs = async () => {
  try {
    const response = await axios.get<Bloc[]>(
      `${endpoint}/api/blocs`,
      getAxiosConfig()
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching all blocs: ", error);
    throw error;
  }
};
