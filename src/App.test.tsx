import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { testData as data } from './static/data';

describe('App component', () => {
  describe('basic workflows', () => {
    it('shows start screen on startup', () => {
      render(<App questions={data.questions} answers={data.answers}></App>);

      const startPage = screen.queryByText(
        /Here you can practice your knowledge for the course!/i,
      );
      expect(startPage).toBeInTheDocument();
    });

    it('shows the quiz after clicking on button to start quiz', () => {
      render(<App questions={data.questions} answers={data.answers}></App>);

      expect(screen.queryByTestId('quiz')).not.toBeInTheDocument();

      const button = screen.getByText(/Complete set/i);
      fireEvent.click(button);

      expect(screen.getByTestId('quiz')).toBeInTheDocument();
    });

    it('shows the result page after clicking on button to end quiz', () => {
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

    it('shows the result page after answering all questions', () => {
      render(<App questions={data.questions} answers={data.answers}></App>);
      const numberOfQuestions = data.questions.length;
      const button = screen.getByText(/Complete set/i);
      fireEvent.click(button);

      // conduct a pseudo quiz
      data.questions.forEach((_, index) => {
        fireEvent.click(screen.getAllByText(/Answer/i)[0]);
        fireEvent.click(screen.getByText('Submit Answer'));

        // check if shows right progress
        const indexText = `${index + 1} of ${numberOfQuestions}`;
        const indexTextEl = screen.getByText(indexText);
        expect(indexTextEl).toBeInTheDocument();

        fireEvent.click(screen.getByText('Next Question'));
      });

      const result = screen.queryByText(/Result/i);

      expect(result).toBeInTheDocument();
    });

    it('shows the start page again after ending the quiz when starting a new quiz', () => {
      render(<App questions={data.questions} answers={data.answers}></App>);

      const button = screen.getByText(/Complete set/i);
      fireEvent.click(button);

      const quiz = screen.queryByTestId('quiz');
      expect(quiz).toBeInTheDocument();

      const endButton = screen.getByText(/End quiz/i);
      fireEvent.click(endButton);

      const newButton = screen.getByText(/New quiz/i);
      fireEvent.click(newButton);

      const quizAfterEnding = screen.queryByTestId('quiz');

      const startPage = screen.queryByText(
        /Here you can practice your knowledge for the course!/i,
      );

      expect(quizAfterEnding).not.toBeInTheDocument();
      expect(newButton).not.toBeInTheDocument();
      expect(startPage).toBeInTheDocument();
    });
  });
});
