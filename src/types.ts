export type Data = {
  questions: QuestionType[];
  answers: AnswerType[];
};

export enum QuestionTypes {
  MultipleChoice = 'Xikolo::Quiz::MultipleChoiceQuestion',
  MultipleAnswer = 'Xikolo::Quiz::MultipleAnswerQuestion',
}

export type QuizType =
  | QuestionTypes.MultipleChoice
  | QuestionTypes.MultipleAnswer;

export type QuestionType = {
  id: string;
  points: number;
  type: QuizType;
  text: string;
  courseId: string;
  quizId: string;
  answers: string[];
};

export type AnswerType = {
  id: string;
  correct: boolean;
  text: string;
};

export type ResultType = {
  question: QuestionType;
  correctlyAnswered: boolean;
};
