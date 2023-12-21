export interface Data {
  questions: Question[];
  answers: Answer[];
}

export enum QuestionTypes {
  MultipleChoice = 'Xikolo::Quiz::MultipleChoiceQuestion',
  MultipleAnswer = 'Xikolo::Quiz::MultipleAnswerQuestion',
}

export type QuizType =
  | QuestionTypes.MultipleChoice
  | QuestionTypes.MultipleAnswer;

export interface Question {
  id: string;
  points: number;
  type: QuizType;
  text: string;
  courseId: string;
  quizId: string;
  answers: string[];
}

export interface Answer {
  id: string;
  correct: boolean;
  text: string;
}

export type ResultType = {
  question: Question;
  correctlyAnswered: boolean;
  attempts: number;
  link: string;
};
