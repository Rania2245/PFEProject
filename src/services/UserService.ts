import { endpoint } from "../constants";
export const loginUser = (email: string, password: string) => {
  return fetch(`${endpoint}login`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
};
