import { Answer, Question } from './types';

export const validateSelectionIsCorrect = (
  answers: Answer[],
  selections: Answer[]
) => {
  if (
    selections.some((selection) => {
      return !selection.correct;
    })
  ) {
    return false;
  } else {
    const correctSelections = selections.filter((selection) => {
      return selection.correct;
    }).length;
    const correctAnswers: number = answers.filter((answer) => {
      return answer.correct;
    }).length;
    return correctSelections === correctAnswers;
  }
};

export const isAlreadySelected = (selections: Answer[], selection: Answer) => {
  return selections.find((item) => {
    return selection.id === item.id;
  });
};

export const getAnswers = (
  question: Question,
  allAnswers: Answer[]
): Answer[] => {
  return question.answers.map((answerId) => {
    return allAnswers.find((answer) => answer.id === answerId)!;
  });
};
