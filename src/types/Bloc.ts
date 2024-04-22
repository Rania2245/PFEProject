import { BlocOption } from "./BlocOptions";
import { Page } from "./Page";
import { ElementBloc } from "./elementBloc";

export type Bloc = {
  id?: Number;
  typeBloc: string;
  name: string;
  id_page?: Page;
  elementsBloc: ElementBloc[];
};
