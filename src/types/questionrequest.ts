import { PartageOption } from "./partageOption";
import { Question } from "./question";
import { Response } from "./response";
export type QuestionRequest = {
  id?: number;
  questions: Question[];
  responses: Response[];
  created_at?: Date;
  langue: string;
  partage: PartageOption;

  user_id?: number;
};
