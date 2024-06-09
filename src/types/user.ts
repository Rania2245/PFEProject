import { Role } from "./Role";
import { Department } from "./department";

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  departments: Department[];
  roles: Role[];
};
