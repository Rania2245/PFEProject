import axios from "axios";
import { endpoint } from "../constants";
import { Page } from "../types/Page";

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

export const getPageById = async (id: string) => {
  try {
    const response = await axios.get<Page>(
      `${endpoint}/api/pages/${id}`,
      getAxiosConfig()
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching page with ID ${id}: `, error);
    throw error;
  }
};

export const createPage = async (pageData: Page) => {
  try {
    const response = await axios.post<Page>(
      `${endpoint}/api/pages`,
      pageData,
      getAxiosConfig()
    );
    return response.data;
  } catch (error) {
    console.error("Error creating page: ", error);
    throw error;
  }
};

export const updatePage = async (id: number, pageData: Page) => {
  try {
    await axios.put(`${endpoint}/api/pages/${id}`, pageData, getAxiosConfig());
  } catch (error) {
    console.error(`Error updating page with ID ${id}: `, error);
    throw error;
  }
};

export const deletePage = async (id: string) => {
  try {
    await axios.delete(`${endpoint}/api/pages/${id}`, getAxiosConfig());
  } catch (error) {
    console.error(`Error deleting page with ID ${id}: `, error);
    throw error;
  }
};
export const getAllPages = async () => {
  try {
    const response = await axios.get<Page[]>(
      `${endpoint}/api/pages`,
      getAxiosConfig()
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching all pages: ", error);
    throw error;
  }
};
