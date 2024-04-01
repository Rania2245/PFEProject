import { Bloc } from "./Bloc";
import { Page } from "./Page";
import { ElementBloc } from "./elementBloc";

export class DefaultMessage implements Bloc {
  id?: Number;
  name: string;
  id_page?: Page;
  elementsBloc: ElementBloc[];

  constructor(
    name: string,
    elementsBloc: ElementBloc[],
    id?: Number,
    id_page?: Page
  ) {
    this.name = name;
    this.elementsBloc = elementsBloc;
    this.id = id;
    this.id_page = id_page;
  }
}
