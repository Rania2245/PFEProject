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

export const fetchLogs = async () => {
  try {
    const response = await axios.get(
      `${endpoint}/api/logPage`,
      getAxiosConfig()
    );

    const logs = response.data;
    console.log(logs);
    return logs;
  } catch (error) {
    console.error("Error fetching logs:", error);
    throw error;
  }
};
