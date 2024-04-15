import { Bloc } from "./Bloc";
import { BlocOption } from "./BlocOptions";
import { GalleryFormData } from "./Galerie";

export type ElementBloc = {
  id?: number;
  type: string;
  data: string;
  file?: File;
  id_bloc?: Bloc;
  blocOptions: BlocOption[];
  gallery?: GalleryFormData[];
};
