import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { testData as data } from './static/data';

test('shows start screen on startup', () => {
  render(<App questions={data.questions} answers={data.answers}></App>);

  const quiz = screen.queryByTestId('quiz');
  expect(quiz).not.toBeInTheDocument();

  const startPage = screen.queryByText(
    /Here you can practice your knowledge for the course!/i
  );
  expect(startPage).toBeInTheDocument();
});

test('after clicking on button to start quiz, it shows the quiz component', () => {
  render(<App questions={data.questions} answers={data.answers}></App>);

  const button = screen.getByText(/Complete set/i);
  fireEvent.click(button);

  const quiz = screen.queryByTestId('quiz');
  expect(quiz).toBeInTheDocument();
});

test('after clicking on button to end quiz, it shows the result page', () => {
  render(<App questions={data.questions} answers={data.answers}></App>);

  const button = screen.getByText(/Complete set/i);
  fireEvent.click(button);

  const quiz = screen.queryByTestId('quiz');
  expect(quiz).toBeInTheDocument();

  const endButton = screen.getByText(/End quiz/i);
  fireEvent.click(endButton);

  const result = screen.queryByText(/Result/i);
  expect(result).toBeInTheDocument();
});

test.todo('test that the result page is shown after answering all questions');

test('starting a new quiz, it shows the start page again', () => {
  render(<App questions={data.questions} answers={data.answers}></App>);

  const button = screen.getByText(/Complete set/i);
  fireEvent.click(button);

  const quiz = screen.queryByTestId('quiz');
  expect(quiz).toBeInTheDocument();

  const endButton = screen.getByText(/New quiz/i);
  fireEvent.click(endButton);

  const quizAfterEnding = screen.queryByTestId('quiz');
  expect(quizAfterEnding).not.toBeInTheDocument();

  const startPage = screen.queryByText(
    /Here you can practice your knowledge for the course!/i
  );
  expect(startPage).toBeInTheDocument();
});
