import { Bloc } from "./Bloc";
import { BlocOption } from "./BlocOptions";

export type ElementBloc = {
  id?: number;
  type: string;
  data: string;
  id_bloc?: Bloc;
  blocOptions: BlocOption[];
};
