export type QuestionRequest = {
  id: number;
  question: string;
  response: string;
  createdAt: Date;
  active: boolean;
  partage: boolean;
  user_id: number;
};
