import axios from "axios";
import { endpoint } from "../constants";

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
export const getDepartmentsByIds = async (departmentIds: string[]) => {
  try {
    const response = await axios.get(
      `${endpoint}/api/departments/${departmentIds}`,
      getAxiosConfig()
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching departments:", error);
    throw error;
  }
};
const addDep = async (name: string) => {
  try {
    const { data } = await axios.post(
      `${endpoint}/api/departments`,
      { name },
      getAxiosConfig()
    );
    return data;
  } catch (error) {
    console.error(`Error adding department: ${error}`);
    throw error;
  }
};

const getDeps = async () => {
  try {
    const { data } = await axios.get(
      `${endpoint}/api/departments`,
      getAxiosConfig()
    );
    return data;
  } catch (error) {
    console.error(`Error fetching departments: ${error}`);
    throw error;
  }
};

const updateDep = async (id: string, name: string) => {
  try {
    const { data } = await axios.put(
      `${endpoint}/api/departments/${id}`,
      { name },
      getAxiosConfig()
    );
    return data;
  } catch (error) {
    console.error(`Error updating department: ${error}`);
    throw error;
  }
};

const deleteDep = async (id: string) => {
  try {
    const { data } = await axios.delete(
      `${endpoint}/api/departments/${id}`,
      getAxiosConfig()
    );
    return data;
  } catch (error) {
    console.error(`Error deleting department: ${error}`);
    throw error;
  }
};
const getDepById = async (roleId: string) => {
  try {
    const response = await axios.get(
      `${endpoint}/api/departments/${roleId}`,
      getAxiosConfig()
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching department:", error);
    throw error;
  }
};
export const findDepByName = async (name: string) => {
  try {
    const { data } = await axios.get(
      `${endpoint}/api/departmentSearch`,

      { params: { name } },
      //@ts-expect-error
      getAxiosConfig()
    );
    return data;
  } catch (error) {
    console.error(`Error finding departments by name: ${error}`);
    throw error;
  }
};
export { getAxiosConfig, addDep, getDeps, updateDep, deleteDep, getDepById };
