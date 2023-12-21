import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import { testData } from './static/data';
import { Data, QuestionTypes } from './types';

test('renders Quiz recap components', async () => {
  render(<App questions={testData.questions} answers={testData.answers} />);

  const titleElement = screen.getByText(/Quiz recap/i);
  const submitButton = screen.getByText('Submit Answer');
  const answers = await screen.findAllByRole('radio');
  const question = screen.getByText(/What is the answer?/i);

  expect(titleElement).toBeInTheDocument();

  expect(submitButton).toBeInTheDocument();
  expect(submitButton).not.toBeDisabled();

  expect(answers.length).toBeGreaterThanOrEqual(1);
  expect(question).toBeInTheDocument();
});

test('Conducting a multiple choice quiz', () => {
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

  render(<App questions={testData.questions} answers={testData.answers} />);

  fireEvent.click(screen.getByText('Answer 1'));
  fireEvent.click(screen.getByText('Submit Answer'));

  expect(screen.getByText(/Your answer was correct/i)).toBeInTheDocument();

  fireEvent.click(screen.getByText('Next Question'));

  fireEvent.click(screen.getByText('Answer 2'));
  fireEvent.click(screen.getByText('Submit Answer'));

  expect(screen.getByText(/Your answer was not correct/i)).toBeInTheDocument();
});

test('Conducting a multiple answer quiz', () => {
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
  render(<App questions={testData.questions} answers={testData.answers} />);

  // Selecting only one correct answer is not enough to succeed
  fireEvent.click(screen.getByText('Answer 1'));
  fireEvent.click(screen.getByText('Submit Answer'));

  expect(screen.getByText(/Your answer was not correct/i)).toBeInTheDocument();

  fireEvent.click(screen.getByText('Next Question'));

  // Selecting one false answer causes quiz to fail
  fireEvent.click(screen.getByText('Answer 1'));
  fireEvent.click(screen.getByText('Answer 2'));
  fireEvent.click(screen.getByText('Answer 3'));

  fireEvent.click(screen.getByText('Submit Answer'));

  expect(screen.getByText(/Your answer was not correct/i)).toBeInTheDocument();

  fireEvent.click(screen.getByText('Next Question'));

  // Selecting all correct answers is enough to succeed
  fireEvent.click(screen.getByText('Answer 1'));
  fireEvent.click(screen.getByText('Answer 3'));
  fireEvent.click(screen.getByText('Submit Answer'));

  expect(screen.getByText(/Your answer was correct/i)).toBeInTheDocument();
});
