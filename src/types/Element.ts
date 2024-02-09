import { Payload } from "./Payload";

export type Element = {
  id: Number;
  id_Menu: Number;
  title: string;
  type: string;
  url: String;
  payload: Payload[];
};
