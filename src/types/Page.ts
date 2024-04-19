import { Bloc } from "./Bloc";
import { Menu } from "./Menu";
import { User } from "./user";

export type Page = {
  id: string;
  accessToken: String;
  verifyToken: String;
  appSecret: String;
  menu: Menu;
  bloc: Bloc;
  id_user: User;
};
