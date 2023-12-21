export interface Data {
  questions: Question[];
  answers: Answer[];
}

export type QuizType =
  | 'Xikolo::Quiz::MultipleChoiceQuestion'
  | 'Xikolo::Quiz::MultipleAnswerQuestion';

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
