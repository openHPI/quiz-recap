import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { testData as data, testDataWithFourQuestions } from './static/data';

describe('App component', () => {
  describe('basic workflows', () => {
    it('shows start screen on startup', () => {
      render(<App data={data}></App>);

      const startPage = screen.queryByText(
        /Here you can practice your knowledge!/i,
      );
      expect(startPage).toBeInTheDocument();
    });

    it('shows the quiz after clicking on button to start quiz', () => {
      render(<App data={data}></App>);

      expect(screen.queryByTestId('quiz')).not.toBeInTheDocument();

      const button = screen.getByText(/Complete set/i);
      fireEvent.click(button);

      expect(screen.getByTestId('quiz')).toBeInTheDocument();
    });

    it('shows the result page after confirming to end the quiz', () => {
      render(<App data={data}></App>);

      const button = screen.getByText(/Complete set/i);
      fireEvent.click(button);

      const quiz = screen.queryByTestId('quiz');
      expect(quiz).toBeInTheDocument();

      const endButton = screen.getByText(/End quiz/i);
      fireEvent.click(endButton);

      const confirmation = screen.getByText(
        /Are you sure you want to end the quiz?/i,
      );
      expect(confirmation).toBeInTheDocument();

      const confirmButton = screen.getByText(/Yes/i);
      fireEvent.click(confirmButton);

      const result = screen.queryByText(/Result/i);
      expect(result).toBeInTheDocument();
    });

    it('has the possibility to resume the quiz after not confirming to end the quiz', () => {
      render(<App data={data}></App>);

      const button = screen.getByText(/Complete set/i);
      fireEvent.click(button);

      const quiz = screen.queryByTestId('quiz');
      expect(quiz).toBeInTheDocument();

      const endButton = screen.getByText(/End quiz/i);
      fireEvent.click(endButton);

      const confirmation = screen.getByText(
        /Are you sure you want to end the quiz?/i,
      );
      expect(confirmation).toBeInTheDocument();

      const confirmButton = screen.getByText(/No/i);
      fireEvent.click(confirmButton);

      expect(quiz).toBeInTheDocument();
    });

    it('shows the result page after answering all questions', () => {
      render(<App data={data}></App>);
      const numberOfQuestions = data.length;
      const button = screen.getByText(/Complete set/i);
      fireEvent.click(button);

      // conduct a pseudo quiz
      data.forEach((_, index) => {
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

    it('shows the result page after answering a quick set of questions', () => {
      render(<App data={testDataWithFourQuestions}></App>);
      const button = screen.getByText(/Quick set/i);
      fireEvent.click(button);

      // quick set only contains one question
      // We conduct the quiz with exactly one question
      // To test if the App respects the number of questions
      const numberOfQuestions = 1;
      for (let index = 0; index < numberOfQuestions; index++) {
        fireEvent.click(screen.getAllByText(/Answer/i)[0]);
        fireEvent.click(screen.getByText('Submit Answer'));

        // check if shows right progress
        const indexText = `${index + 1} of ${numberOfQuestions}`;
        const indexTextEl = screen.getByText(indexText);
        expect(indexTextEl).toBeInTheDocument();

        fireEvent.click(screen.getByText('Next Question'));
      }

      const result = screen.queryByText(/Result/i);

      expect(result).toBeInTheDocument();
    });

    it('shows the start page again after ending the quiz when starting a new quiz', () => {
      render(<App data={data}></App>);

      const button = screen.getByText(/Complete set/i);
      fireEvent.click(button);

      const quiz = screen.queryByTestId('quiz');
      expect(quiz).toBeInTheDocument();

      const endButton = screen.getByText(/End quiz/i);
      fireEvent.click(endButton);

      const confirmButton = screen.getByText(/Yes/i);
      fireEvent.click(confirmButton);

      const newButton = screen.getByText(/New quiz/i);
      fireEvent.click(newButton);

      const quizAfterEnding = screen.queryByTestId('quiz');

      const startPage = screen.queryByText(
        /Here you can practice your knowledge!/i,
      );

      expect(quizAfterEnding).not.toBeInTheDocument();
      expect(newButton).not.toBeInTheDocument();
      expect(startPage).toBeInTheDocument();
    });
  });
});
