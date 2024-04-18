import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Data, QuestionTypes } from '../types';
import Quiz from './Quiz';
import { Context } from '../Context';
import { translationsProvider } from '../util';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const customRender = (ui: any, { providerProps, ...renderOptions }: any) => {
  return render(<Context.Provider {...providerProps}>{ui}</Context.Provider>, {
    wrapper: translationsProvider,
    ...renderOptions,
  });
};

describe('Quiz component', () => {
  it('renders answer and submit button', () => {
    const testData: Data = [
      {
        id: 'id-01',
        points: 1,
        type: QuestionTypes.SingleChoice,
        text: 'What is the answer?',
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
      },
      {
        id: 'id-02',
        points: 1,
        type: QuestionTypes.SingleChoice,
        text: 'What is the answer?',
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
      },
    ];

    const providerProps = {
      value: {
        questionsPool: [],
        setQuestionsPool: () => {},
        setQuizEnded: () => {},
      },
    };
    customRender(<Quiz questions={testData} />, { providerProps });

    const answers = screen.getByTestId('answers');

    const submitButton = screen.getByText('Submit Answer');
    const question = screen.getByText(/What is the answer?/i);

    expect(answers).toBeInTheDocument();

    expect(submitButton).toBeInTheDocument();
    expect(submitButton).not.toBeDisabled();

    expect(question).toBeInTheDocument();
  });
});

describe('Conducting a single choice quiz', () => {
  it('shows that the answer was correct or not', async () => {
    const testData: Data = [
      {
        id: 'id-01',
        points: 1,
        type: QuestionTypes.SingleChoice,
        text: 'What is the answer?',
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
      },
      {
        id: 'id-02',
        points: 1,
        type: QuestionTypes.SingleChoice,
        text: 'What is the answer?',
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
      },
    ];

    const providerProps = {
      value: {
        quizEnded: false,
        setQuizEnded: () => {},
        numberOfQuestions: 2,
        results: [],
        setResults: () => {},
        questionsPool: [],
        setQuestionsPool: () => {},
      },
    };
    customRender(<Quiz questions={testData} />, { providerProps });

    await userEvent.click(screen.getByText('Answer 1'));
    await userEvent.click(screen.getByText('Submit Answer'));

    expect(screen.getByText(/Your answer was correct/i)).toBeInTheDocument();

    await userEvent.click(screen.getByText('Next Question'));

    await userEvent.click(screen.getByText('Answer 2'));
    await userEvent.click(screen.getByText('Submit Answer'));

    expect(
      screen.getByText(/Your answer was not correct/i),
    ).toBeInTheDocument();
  });
});

describe('Conducting a multiple answer quiz', () => {
  it('shows that the answer was correct or not', async () => {
    const testData: Data = [
      {
        id: 'id-01',
        points: 1,
        type: QuestionTypes.MultipleChoice,
        text: 'What is the answer?',
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
          {
            id: 'answer_03',
            correct: true,
            text: 'Answer 3',
          },
          {
            id: 'answer_04',
            correct: false,
            text: 'Answer 4',
          },
        ],
      },
      {
        id: 'id-02',
        points: 1,
        type: QuestionTypes.MultipleChoice,
        text: 'What is the answer?',
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
          {
            id: 'answer_03',
            correct: true,
            text: 'Answer 3',
          },
          {
            id: 'answer_04',
            correct: false,
            text: 'Answer 4',
          },
        ],
      },
      {
        id: 'id-03',
        points: 1,
        type: QuestionTypes.MultipleChoice,
        text: 'What is the answer?',
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
          {
            id: 'answer_03',
            correct: true,
            text: 'Answer 3',
          },
          {
            id: 'answer_04',
            correct: false,
            text: 'Answer 4',
          },
        ],
      },
    ];
    const providerProps = {
      value: {
        quizEnded: false,
        setQuizEnded: () => {},
        numberOfQuestions: 2,
        results: [],
        setResults: () => {},
        questionsPool: [],
        setQuestionsPool: () => {},
      },
    };
    customRender(<Quiz questions={testData} />, { providerProps });

    // Selecting only one correct answer is not enough to succeed
    await userEvent.click(screen.getByText('Answer 1'));
    await userEvent.click(screen.getByText('Submit Answer'));

    expect(
      screen.getByText(/Your answer was not correct/i),
    ).toBeInTheDocument();

    await userEvent.click(screen.getByText('Next Question'));

    // Selecting one false answer causes quiz to fail
    await userEvent.click(screen.getByText('Answer 1'));
    await userEvent.click(screen.getByText('Answer 2'));
    await userEvent.click(screen.getByText('Answer 3'));

    await userEvent.click(screen.getByText('Submit Answer'));

    expect(
      screen.getByText(/Your answer was not correct/i),
    ).toBeInTheDocument();

    await userEvent.click(screen.getByText('Next Question'));

    // Selecting all correct answers is enough to succeed
    await userEvent.click(screen.getByText('Answer 1'));
    await userEvent.click(screen.getByText('Answer 3'));
    await userEvent.click(screen.getByText('Submit Answer'));

    expect(screen.getByText(/Your answer was correct/i)).toBeInTheDocument();
  });
});
