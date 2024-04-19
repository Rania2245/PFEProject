import { Page } from "./Page";
import { Payload } from "./Payload";
import { ElementBloc } from "./elementBloc";

export type Menu = {
  id?: Number;
  name: string;
  id_page?: Page;
  elementsMenu: ElementBloc[];
};
