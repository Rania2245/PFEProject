import { Bloc } from "./Bloc";
import { Page } from "./Page";
import { ElementBloc } from "./elementBloc";

export class WelcomeMessage implements Bloc {
  id?: number;
  name: string;
  id_page?: Page;
  elementsBloc: ElementBloc[];

  constructor(
    name: string,
    elementsBloc: ElementBloc[],
    id?: number,
    id_page?: Page
  ) {
    this.name = name;
    this.elementsBloc = elementsBloc;
    this.id = id;
    this.id_page = id_page;
  }
}
