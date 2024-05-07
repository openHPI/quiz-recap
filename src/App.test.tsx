import { render, screen } from '@testing-library/react';
import userEvent, { UserEvent } from '@testing-library/user-event';
import { within } from '@testing-library/dom';
import App from './App';
import {
  testData as data,
  testDataWithOneQuestion,
  testDataWithTwoQuestion,
} from './static/data';
import { translationsProvider } from './util';

const answerQuestionCorrectly = async (user: UserEvent) => {
  const correctAnswers = screen.queryAllByText('Correct Answer');
  correctAnswers.forEach(async (answer) => {
    await user.click(answer);
  });
  await user.click(screen.getByText('Submit Answer'));
};

const answerQuestionIncorrectly = async (user: UserEvent) => {
  await user.click(screen.getAllByText('Incorrect Answer')[0]);
  await user.click(screen.getByText('Submit Answer'));
};

describe('App component', () => {
  describe('basic workflows', () => {
    it('shows start screen on startup', () => {
      render(<App data={data}></App>, { wrapper: translationsProvider });

      const startPage = screen.queryByText(
        /Here you can practice your knowledge!/i,
      );
      expect(startPage).toBeInTheDocument();
    });

    it('shows the quiz after clicking on button to start quiz', async () => {
      const user = userEvent.setup();
      render(<App data={data}></App>, { wrapper: translationsProvider });

      expect(screen.queryByTestId('quiz')).not.toBeInTheDocument();

      const button = screen.getByText(/Complete set/i);
      await user.click(button);

      expect(screen.getByTestId('quiz')).toBeInTheDocument();
    });

    it('shows the result page after confirming to end the quiz', async () => {
      const user = userEvent.setup();
      render(<App data={data}></App>, { wrapper: translationsProvider });

      const button = screen.getByText(/Complete set/i);
      await user.click(button);

      const quiz = screen.queryByTestId('quiz');
      expect(quiz).toBeInTheDocument();

      const endButton = screen.getByText(/End quiz/i);
      await user.click(endButton);

      const confirmation = screen.getByText(
        /Are you sure you want to end the quiz?/i,
      );
      expect(confirmation).toBeInTheDocument();

      const confirmButton = screen.getByText(/Yes/i);
      await user.click(confirmButton);

      const result = screen.queryByText(/Result/);
      expect(result).toBeInTheDocument();
    });

    it('has the possibility to resume the quiz after not confirming to end the quiz', async () => {
      const user = userEvent.setup();
      render(<App data={data}></App>, { wrapper: translationsProvider });

      const button = screen.getByText(/Complete set/i);
      await user.click(button);

      const quiz = screen.queryByTestId('quiz');
      expect(quiz).toBeInTheDocument();

      const endButton = screen.getByText(/End quiz/i);
      await user.click(endButton);

      const confirmation = screen.getByText(
        /Are you sure you want to end the quiz?/i,
      );
      expect(confirmation).toBeInTheDocument();

      const confirmButton = screen.getByText(/No/i);
      await user.click(confirmButton);

      expect(quiz).toBeInTheDocument();
    });

    it('shows the result page after answering all questions', async () => {
      const user = userEvent.setup();
      render(<App data={data}></App>, { wrapper: translationsProvider });

      const numberOfQuestions = data.length;
      const button = screen.getByText(/Complete set/i);
      await user.click(button);

      // conduct a pseudo quiz
      for (let index = 0; index < data.length; index++) {
        await answerQuestionCorrectly(user);

        // check if shows right progress
        const indexText = `${index + 1} of ${numberOfQuestions}`;
        const indexTextEl = screen.getByText(indexText);
        expect(indexTextEl).toBeInTheDocument();

        await user.click(screen.getByText('Next Question'));
      }

      const result = screen.queryByText(/Result/);
      expect(result).toBeInTheDocument();
    });

    it('shows the result page after answering all questions', async () => {
      const user = userEvent.setup();
      render(<App data={testDataWithOneQuestion}></App>, {
        wrapper: translationsProvider,
      });

      const button = screen.getByText(/Complete set/i);
      await user.click(button);

      // We conduct the quiz with exactly one question
      // To test if the App respects the number of questions
      const numberOfQuestions = 1;

      for (let index = 0; index < numberOfQuestions; index++) {
        await answerQuestionCorrectly(user);

        // Check if shows right progress
        const indexText = `${index + 1} of ${numberOfQuestions}`;
        const indexTextEl = screen.getByText(indexText);
        expect(indexTextEl).toBeInTheDocument();

        await user.click(screen.getByText('Next Question'));
      }

      const result = screen.queryByText(/Result/);
      expect(result).toBeInTheDocument();
    });

    it('shows the start page again after ending the quiz when starting a new quiz', async () => {
      const user = userEvent.setup();
      render(<App data={data}></App>, { wrapper: translationsProvider });

      const button = screen.getByText(/Complete set/i);
      await user.click(button);

      const quiz = screen.queryByTestId('quiz');
      expect(quiz).toBeInTheDocument();

      const endButton = screen.getByText(/End quiz/i);
      await user.click(endButton);

      const confirmButton = screen.getByText(/Yes/i);
      await user.click(confirmButton);

      const newButton = screen.getByText(/New quiz/i);
      await user.click(newButton);

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

  describe('quiz sets', () => {
    it('has 4 available sets when the quiz has more than 50 questions', () => {
      const testDataWith52Questions = data.flatMap((item) =>
        Array(13).fill(item),
      );
      render(<App data={testDataWith52Questions}></App>, {
        wrapper: translationsProvider,
      });

      const completeSet = screen.getByRole('button', {
        name: /Complete set/i,
      });
      const largeSet = screen.getByRole('button', { name: /Large set/i });
      const mediumSet = screen.getByRole('button', { name: /Medium set/i });
      const quickSet = screen.getByRole('button', { name: /Quick set/i });
      expect(completeSet).toBeInTheDocument();
      expect(largeSet).toBeInTheDocument();
      expect(mediumSet).toBeInTheDocument();
      expect(quickSet).toBeInTheDocument();
    });

    it('does not show any set with more questions than the complete one', () => {
      const testDataWith16Questions = data.flatMap((item) =>
        Array(4).fill(item),
      );
      render(<App data={testDataWith16Questions}></App>, {
        wrapper: translationsProvider,
      });

      const completeSet = screen.getByRole('button', {
        name: /Complete set/i,
      });
      const largeSet = screen.queryByRole('button', { name: /Large set/i });
      const mediumSet = screen.queryByRole('button', { name: /Medium set/i });
      const quickSet = screen.getByRole('button', { name: /Quick set/i });
      expect(completeSet).toBeInTheDocument();
      expect(largeSet).not.toBeInTheDocument();
      expect(mediumSet).not.toBeInTheDocument();
      expect(quickSet).toBeInTheDocument();
    });
  });

  describe('multiple attempts feature', () => {
    it('shows a wrongly answered question again up to 3 times', async () => {
      const user = userEvent.setup();

      render(<App data={testDataWithOneQuestion}></App>, {
        wrapper: translationsProvider,
      });

      const button = screen.getByText(/Complete set/i);
      await user.click(button);

      // Answer wrongly 3 times
      for (let i = 0; i < 3; i++) {
        await answerQuestionIncorrectly(user);
        await user.click(screen.getByText('Next Question'));
      }

      // The results page appears after the 3th time
      const result = screen.queryByText(/You answered 0 of 1 correctly./);
      expect(result).toBeInTheDocument();
    });

    it('shows the attempts needed for each question', async () => {
      const user = userEvent.setup();
      render(<App data={testDataWithTwoQuestion}></App>, {
        wrapper: translationsProvider,
      });

      const button = screen.getByText(/Complete set/i);
      await user.click(button);

      let indexTextEl = screen.getByText('1 of 2');
      expect(indexTextEl).toBeInTheDocument();

      // Correctly answer the first question
      await answerQuestionCorrectly(user);
      await user.click(screen.getByText('Next Question'));

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

        await answerQuestionIncorrectly(user);
        await user.click(screen.getByText('Next Question'));
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

    it('displays the quiz progress', async () => {
      const user = userEvent.setup();
      render(<App data={testDataWithTwoQuestion}></App>, {
        wrapper: translationsProvider,
      });

      const button = screen.getByText(/Complete set/i);
      await user.click(button);

      let indexTextEl = screen.getByText('1 of 2');

      for (let i = 0; i < 5; i++) {
        // The progress count does not change
        expect(indexTextEl).toBeInTheDocument();
        await answerQuestionIncorrectly(user);
        await user.click(screen.getByText('Next Question'));
      }

      // After the attempts of the first question have expire, the progress is updated
      indexTextEl = screen.getByText('2 of 2');
      expect(indexTextEl).toBeInTheDocument();
    });

    it('displays the remaining attempts after wrongly answering a question', async () => {
      const user = userEvent.setup();

      render(<App data={testDataWithOneQuestion}></App>, {
        wrapper: translationsProvider,
      });

      const button = screen.getByText(/Complete set/i);
      await user.click(button);

      for (let i = 0; i < 2; i++) {
        await answerQuestionIncorrectly(user);
        const attemptLeft = i === 1 ? 'attempt' : 'attempts';
        const notCorrectText = screen.getByText(
          `Your answer was not correct. You have ${2 - i} ${attemptLeft} left.`,
        );
        expect(notCorrectText).toBeInTheDocument();
        await user.click(screen.getByText('Next Question'));
      }

      await answerQuestionIncorrectly(user);
      const lastAttemptText = screen.getByText(`Your answer was not correct.`);
      expect(lastAttemptText).toBeInTheDocument();
    });
  });
});
