import { Department } from "./department";

export type User = {
  name: string;
  email: string;
  password: string;
  department: Department;
};
