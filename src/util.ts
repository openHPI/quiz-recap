import { AnswerType, Data } from './types';

export const validateSelectionIsCorrect = (
  answers: AnswerType[],
  selections: AnswerType[],
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

export const isAlreadySelected = (
  selections: AnswerType[],
  selection: AnswerType,
) => {
  return selections.find((item) => {
    return selection.id === item.id;
  });
};

export const getRandomSet = (set: Data, count: number): any => {
  return set.sort(() => 0.5 - Math.random()).slice(0, count);
};
