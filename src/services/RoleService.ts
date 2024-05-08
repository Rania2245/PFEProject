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
export const getRolessByIds = async (RoleId: string[]) => {
  try {
    const response = await axios.get(
      `${endpoint}/api/roles/${RoleId}`,
      getAxiosConfig()
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching role:", error);
    throw error;
  }
};
const addRole = async (name: string) => {
  try {
    const { data } = await axios.post(
      `${endpoint}/api/roles`,
      { name },
      getAxiosConfig()
    );
    return data;
  } catch (error) {
    console.error(`Error adding role: ${error}`);
    throw error;
  }
};

const getRoles = async () => {
  try {
    const { data } = await axios.get(`${endpoint}/api/roles`, getAxiosConfig());
    return data;
  } catch (error) {
    console.error(`Error fetching roles: ${error}`);
    throw error;
  }
};

const updateRole = async (id: string, name: string) => {
  try {
    const { data } = await axios.put(
      `${endpoint}/api/roles/${id}`,
      { name },
      getAxiosConfig()
    );
    return data;
  } catch (error) {
    console.error(`Error updating role: ${error}`);
    throw error;
  }
};

const deleteRoles = async (id: string) => {
  try {
    const { data } = await axios.delete(
      `${endpoint}/api/roles/${id}`,
      getAxiosConfig()
    );
    return data;
  } catch (error) {
    console.error(`Error deleting roles: ${error}`);
    throw error;
  }
};
const getRoleById = async (roleId: string) => {
  try {
    const response = await axios.get(
      `${endpoint}/api/roles/${roleId}`,
      getAxiosConfig()
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching role:", error);
    throw error;
  }
};
export const findRoleByName = async (name: string) => {
  try {
    const { data } = await axios.get(
      `${endpoint}/api/rolesSearch`,
      { params: { name } },
      //@ts-expect-error
      getAxiosConfig()
    );
    return data;
  } catch (error) {
    console.error(`Error finding role by name: ${error}`);
    throw error;
  }
};

export {
  getAxiosConfig,
  addRole,
  getRoles,
  updateRole,
  deleteRoles,
  getRoleById,
};
