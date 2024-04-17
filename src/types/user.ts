import { Department } from "./department";

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  department: Department;
};
