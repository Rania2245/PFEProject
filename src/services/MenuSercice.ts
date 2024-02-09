import axios from "axios";
import { endpoint } from "../constants";
import { Menu } from "../types/Menu";

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

export const getMenuById = async (id: number) => {
  try {
    const response = await axios.get<Menu>(
      `${endpoint}/api/menus/${id}`,
      getAxiosConfig()
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching menu with ID ${id}: `, error);
    throw error;
  }
};

export const createMenu = async (menuData: Menu) => {
  try {
    const response = await axios.post<Menu>(
      `${endpoint}/api/menus`,
      menuData,
      getAxiosConfig()
    );
    return response.data;
  } catch (error) {
    console.error("Error creating menu: ", error);
    throw error;
  }
};

export const updateMenu = async (id: number, menuData: Menu) => {
  try {
    await axios.put(`${endpoint}/api/menus/${id}`, menuData, getAxiosConfig());
  } catch (error) {
    console.error(`Error updating menu with ID ${id}: `, error);
    throw error;
  }
};

export const deleteMenu = async (id: number) => {
  try {
    await axios.delete(`${endpoint}/api/menus/${id}`, getAxiosConfig());
  } catch (error) {
    console.error(`Error deleting menu with ID ${id}: `, error);
    throw error;
  }
};
