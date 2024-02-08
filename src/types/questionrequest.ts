export type QuestionRequest = {
  id: number;
  question: string;
  response: string;
  created_at: Date;
  active: boolean;
  partage: boolean;
  user_id: number;
};
