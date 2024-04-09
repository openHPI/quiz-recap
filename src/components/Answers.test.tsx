import { render, screen } from '@testing-library/react';
import { QuestionTypes } from '../types';
import Answers from './Answers';

const testData = {
  answers: [
    {
      id: 'answer_01',
      correct: true,
      text: 'Answer 1',
    },
    {
      id: 'answer_02',
      correct: false,
      text: 'Answer 2',
    },
  ],
};

describe('Answers component', () => {
  it('renders radios with multiple choice question', async () => {
    render(
      <Answers
        type={QuestionTypes.SingleChoice}
        quizId={0}
        answers={testData.answers}
        attempts={3}
        showCorrect={false}
        handleSelection={() => {}}
      />,
    );

    const answers = await screen.findAllByRole('radio');
    expect(answers.length).toBeGreaterThanOrEqual(1);
  });

  it('renders checkboxes with multiple answer question', async () => {
    render(
      <Answers
        type={QuestionTypes.MultipleChoice}
        quizId={0}
        answers={testData.answers}
        attempts={3}
        showCorrect={false}
        handleSelection={() => {}}
      />,
    );

    const answers = await screen.findAllByRole('checkbox');
    expect(answers.length).toBeGreaterThanOrEqual(1);
  });
});
