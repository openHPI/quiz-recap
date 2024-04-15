import { render, screen, fireEvent } from '@testing-library/react';
import { within } from '@testing-library/dom';
import App from './App';
import { testData as data, testDataWithFourQuestions } from './static/data';
import { translationsProvider } from './util';

describe('App component', () => {
  describe('basic workflows', () => {
    it('shows start screen on startup', () => {
      render(<App data={data}></App>, { wrapper: translationsProvider });

      const startPage = screen.queryByText(
        /Here you can practice your knowledge!/i,
      );
      expect(startPage).toBeInTheDocument();
    });

    it('shows the quiz after clicking on button to start quiz', () => {
      render(<App data={data}></App>, { wrapper: translationsProvider });

      expect(screen.queryByTestId('quiz')).not.toBeInTheDocument();

      const button = screen.getByText(/Complete set/i);
      fireEvent.click(button);

      expect(screen.getByTestId('quiz')).toBeInTheDocument();
    });

    it('shows the result page after confirming to end the quiz', () => {
      render(<App data={data}></App>, { wrapper: translationsProvider });

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

      const result = screen.queryByText(/Result/);
      expect(result).toBeInTheDocument();
    });

    it('has the possibility to resume the quiz after not confirming to end the quiz', () => {
      render(<App data={data}></App>, { wrapper: translationsProvider });

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
      render(<App data={data}></App>, { wrapper: translationsProvider });
      const numberOfQuestions = data.length;
      const button = screen.getByText(/Complete set/i);
      fireEvent.click(button);

      // conduct a pseudo quiz
      data.forEach((_, index) => {
        answerQuestionCorrectly();

        // check if shows right progress
        const indexText = `${index + 1} of ${numberOfQuestions}`;
        const indexTextEl = screen.getByText(indexText);
        expect(indexTextEl).toBeInTheDocument();

        fireEvent.click(screen.getByText('Next Question'));
      });

      const result = screen.queryByText(/Result/);
      expect(result).toBeInTheDocument();
    });

    it('shows the result page after answering a quick set of questions', () => {
      render(<App data={testDataWithFourQuestions}></App>, {
        wrapper: translationsProvider,
      });
      const button = screen.getByText(/Quick set/i);
      fireEvent.click(button);

      // quick set only contains one question
      // We conduct the quiz with exactly one question
      // To test if the App respects the number of questions
      const numberOfQuestions = 1;
      for (let index = 0; index < numberOfQuestions; index++) {
        answerQuestionCorrectly();

        // check if shows right progress
        const indexText = `${index + 1} of ${numberOfQuestions}`;
        const indexTextEl = screen.getByText(indexText);
        expect(indexTextEl).toBeInTheDocument();

        fireEvent.click(screen.getByText('Next Question'));
      }

      const result = screen.queryByText(/Result/);

      expect(result).toBeInTheDocument();
    });

    it('shows the start page again after ending the quiz when starting a new quiz', () => {
      render(<App data={data}></App>, { wrapper: translationsProvider });

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

    it('can be set to German', () => {
      render(<App data={data} locale="de"></App>, {
        wrapper: translationsProvider,
      });
      const startPage = screen.queryByText(
        /Hier können Sie Ihr Wissen testen!/i,
      );
      expect(startPage).toBeInTheDocument();
    });

    it('falls back to English if set to a non-supported language', () => {
      render(<App data={data} locale="es"></App>, {
        wrapper: translationsProvider,
      });
      const startPage = screen.queryByText(
        /Here you can practice your knowledge!/i,
      );
      expect(startPage).toBeInTheDocument();
    });
  });

  describe('multiple attempts feature', () => {
    it('shows a wrongly answered question again up to 3 times', () => {
      render(<App data={testDataWithFourQuestions}></App>, {
        wrapper: translationsProvider,
      });

      // A quick set of a test with four questions contains 1 question
      const button = screen.getByText(/Quick set/i);
      fireEvent.click(button);

      // Answer wrongly 3 times
      for (let i = 0; i < 3; i++) {
        fireEvent.click(screen.getAllByText('Incorrect Answer')[0]);
        fireEvent.click(screen.getByText('Submit Answer'));
        fireEvent.click(screen.getByText('Next Question'));
      }

      // The results page appears after the 3th time
      const result = screen.queryByText(/You answered 0 of 1 correctly./);
      expect(result).toBeInTheDocument();
    });

    it('shows the attempts needed for each question', () => {
      render(<App data={testDataWithFourQuestions}></App>, {
        wrapper: translationsProvider,
      });

      const button = screen.getByText(/Medium set/i);
      fireEvent.click(button);

      // A medium set of a test with four questions contains 2 questions
      let indexTextEl = screen.getByText('1 of 2');
      expect(indexTextEl).toBeInTheDocument();

      // Correctly answer the first question
      answerQuestionCorrectly();
      fireEvent.click(screen.getByText('Next Question'));

      // The progress has been updated
      indexTextEl = screen.getByText('2 of 2');
      expect(indexTextEl).toBeInTheDocument();

      let nextQuestion = screen.getByText(/What is the answer/);
      const nextQuestionText = nextQuestion.innerHTML;

      for (let i = 0; i < 3; i++) {
        // The progress count has not changed
        expect(indexTextEl).toBeInTheDocument();

        // The question is again the same
        nextQuestion = screen.getByText(nextQuestionText);
        expect(nextQuestion).toBeInTheDocument();

        fireEvent.click(screen.getAllByText('Incorrect Answer')[0]);
        fireEvent.click(screen.getByText('Submit Answer'));
        fireEvent.click(screen.getByText('Next Question'));
      }

      // After expiring the permitted attempts the results page appears
      const result = screen.queryByText(/You answered 1 of 2 correctly./);
      expect(result).toBeInTheDocument();

      const attemptsElementQ1 = screen.getByTestId('attempts-question-1');
      const attemptsCountQ1 = within(attemptsElementQ1).getByText('1');
      expect(attemptsCountQ1).toBeInTheDocument();

      const attemptsElementQ2 = screen.getByTestId('attempts-question-2');
      const attemptsCountQ2 = within(attemptsElementQ2).getByText('3');
      expect(attemptsCountQ2).toBeInTheDocument();
    });
  });
});

const answerQuestionCorrectly = () => {
  const correctAnswers = screen.queryAllByText('Correct Answer');
  correctAnswers.forEach((answer) => {
    fireEvent.click(answer);
  });
  fireEvent.click(screen.getByText('Submit Answer'));
};
