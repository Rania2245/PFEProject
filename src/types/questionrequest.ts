import { Question } from "./question";
import { Response } from "./response";
export type QuestionRequest = {
  id: number;
  question: Question[];
  response: Response[];
  created_at: Date;
  active: boolean;
  partage: boolean;
  user_id?: number;
};
