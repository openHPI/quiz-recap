import { AnswerType, Data, QuestionDataType, QuestionType } from './types';

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

export const getRandomSet = (set: Array<any>, count: number): any => {
  return set.sort(() => 0.5 - Math.random()).slice(0, count);
};

const getAnswers = (
  question: QuestionDataType,
  allAnswers: AnswerType[],
): AnswerType[] => {
  return question.answers.map((answerId) => {
    return allAnswers.find((answer) => answer.id === answerId)!;
  });
};

export const assignAnswersToQuestions = (data: Data) => {
  const questions: QuestionType[] = [];

  data.questions.forEach((question) => {
    questions.push({
      id: question.id,
      points: question.points,
      type: question.type,
      text: question.text,
      courseId: question.courseId,
      quizId: question.quizId,
      answers: getAnswers(question, data.answers),
    });
  });

  return questions;
};
