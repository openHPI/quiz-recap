export type Data = {
  questions: QuestionDataType[];
  answers: AnswerType[];
};

export enum QuestionTypes {
  MultipleChoice = 'Xikolo::Quiz::MultipleChoiceQuestion',
  MultipleAnswer = 'Xikolo::Quiz::MultipleAnswerQuestion',
}

export type QuizType =
  | QuestionTypes.MultipleChoice
  | QuestionTypes.MultipleAnswer;

export type QuestionDataType = {
  id: string;
  points: number;
  type: QuizType;
  text: string;
  courseId: string;
  quizId: string;
  answers: string[];
};

export type QuestionType = {
  id: string;
  points: number;
  type: QuizType;
  text: string;
  courseId: string;
  quizId: string;
  answers: AnswerType[];
};

export type AnswerType = {
  id: string;
  correct: boolean;
  text: string;
};

export type ResultType = {
  id: string;
  question: QuestionType;
  correctlyAnswered: boolean;
};
