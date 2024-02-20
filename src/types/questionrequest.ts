import { Department } from "./department";
import { PartageOption } from "./partageOption";
import { Question } from "./question";
import { Response } from "./response";
export type QuestionRequest = {
  id?: number;
  questions: Question[];
  responses: Response[];
  created_at?: Date;
  active: boolean;
  partage: PartageOption;

  user_id?: number;
};
