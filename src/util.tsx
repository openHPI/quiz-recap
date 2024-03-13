import { AnswerType, Data } from './types';
import i18n from './i18n';
import { I18nextProvider } from 'react-i18next';

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

export const getRandomSet = (set: Data, count: number): Data => {
  return set.sort(() => 0.5 - Math.random()).slice(0, count);
};

/**
 * Test Helpers
 **/

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const translationsProvider = ({ children }: any) => {
  return <I18nextProvider i18n={i18n}>{children} </I18nextProvider>;
};
