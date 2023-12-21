import { fireEvent, render, screen } from '@testing-library/react';
import { testData } from '../static/data';
import { Data, QuestionTypes } from '../types';
import Quiz from './Quiz';
import { Context } from '../Context';

const customRender = (ui: any, { providerProps, ...renderOptions }: any) => {
  return render(
    <Context.Provider {...providerProps}>{ui}</Context.Provider>,
    renderOptions
  );
};

describe('Quiz component', () => {
  it('renders answer and submit button', () => {
    render(<Quiz data={testData} />);

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
  it('shows that the answer was correct or not', () => {
    const testData: Data = {
      questions: [
        {
          id: 'id-01',
          points: 1,
          type: QuestionTypes.MultipleChoice,
          text: 'What is the answer?',
          courseId: 'courseId-01',
          quizId: 'quizId-01',
          answers: ['answer_01', 'answer_02'],
        },
        {
          id: 'id-02',
          points: 1,
          type: QuestionTypes.MultipleChoice,
          text: 'What is the answer?',
          courseId: 'courseId-01',
          quizId: 'quizId-02',
          answers: ['answer_01', 'answer_02'],
        },
      ],
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

    const providerProps = {
      value: {
        quizEnded: false,
        setQuizEnded: () => {},
        numberOfQuestions: 2,
        results: [],
        setResults: () => {},
      },
    };
    customRender(<Quiz data={testData} />, { providerProps });

    fireEvent.click(screen.getByText('Answer 1'));
    fireEvent.click(screen.getByText('Submit Answer'));

    expect(screen.getByText(/Your answer was correct/i)).toBeInTheDocument();

    fireEvent.click(screen.getByText('Next Question'));

    fireEvent.click(screen.getByText('Answer 2'));
    fireEvent.click(screen.getByText('Submit Answer'));

    expect(
      screen.getByText(/Your answer was not correct/i)
    ).toBeInTheDocument();
  });
});

describe('Conducting a multiple answer quiz', () => {
  it('shows that the answer was correct or not', () => {
    const testData: Data = {
      questions: [
        {
          id: 'id-01',
          points: 1,
          type: QuestionTypes.MultipleAnswer,
          text: 'What is the answer?',
          courseId: 'courseId-01',
          quizId: 'quizId-01',
          answers: ['answer_01', 'answer_02', 'answer_03', 'answer_04'],
        },
        {
          id: 'id-02',
          points: 1,
          type: QuestionTypes.MultipleAnswer,
          text: 'What is the answer?',
          courseId: 'courseId-01',
          quizId: 'quizId-02',
          answers: ['answer_01', 'answer_02', 'answer_03', 'answer_04'],
        },
        {
          id: 'id-03',
          points: 1,
          type: QuestionTypes.MultipleAnswer,
          text: 'What is the answer?',
          courseId: 'courseId-01',
          quizId: 'quizId-03',
          answers: ['answer_01', 'answer_02', 'answer_03', 'answer_04'],
        },
      ],
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
    };

    const providerProps = {
      value: {
        quizEnded: false,
        setQuizEnded: () => {},
        numberOfQuestions: 2,
        results: [],
        setResults: () => {},
      },
    };
    customRender(<Quiz data={testData} />, { providerProps });

    // Selecting only one correct answer is not enough to succeed
    fireEvent.click(screen.getByText('Answer 1'));
    fireEvent.click(screen.getByText('Submit Answer'));

    expect(
      screen.getByText(/Your answer was not correct/i)
    ).toBeInTheDocument();

    fireEvent.click(screen.getByText('Next Question'));

    // Selecting one false answer causes quiz to fail
    fireEvent.click(screen.getByText('Answer 1'));
    fireEvent.click(screen.getByText('Answer 2'));
    fireEvent.click(screen.getByText('Answer 3'));

    fireEvent.click(screen.getByText('Submit Answer'));

    expect(
      screen.getByText(/Your answer was not correct/i)
    ).toBeInTheDocument();

    fireEvent.click(screen.getByText('Next Question'));

    // Selecting all correct answers is enough to succeed
    fireEvent.click(screen.getByText('Answer 1'));
    fireEvent.click(screen.getByText('Answer 3'));
    fireEvent.click(screen.getByText('Submit Answer'));

    expect(screen.getByText(/Your answer was correct/i)).toBeInTheDocument();
  });
});
