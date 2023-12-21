import { createContext } from 'react';
import { ResultType } from './types';

type ContextType = {
  quizEnded: boolean;
  setQuizEnded: React.Dispatch<React.SetStateAction<boolean>>;
  results: ResultType[];
  setResults: React.Dispatch<React.SetStateAction<ResultType[]>>;
  numberOfQuestions: number;
};

export const Context = createContext({} as ContextType);
