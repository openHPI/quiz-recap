export interface Data {
  questions: Question[];
  answers: Answer[];
}

export interface Question {
  id: string;
  points: number;
  type: string;
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
