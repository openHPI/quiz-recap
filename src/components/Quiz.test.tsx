import { fireEvent, render, screen } from '@testing-library/react';
import { parsedData } from '../static/data';
import Quiz from './Quiz';
import { Context } from '../Context';

const customRender = (ui: any, { providerProps, ...renderOptions }: any) => {
  return render(
    <Context.Provider {...providerProps}>{ui}</Context.Provider>,
    renderOptions,
  );
};

describe('Quiz component', () => {
  it('renders answer and submit button', () => {
    render(<Quiz questions={parsedData} />);

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
    const providerProps = {
      value: {
        quizEnded: false,
        setQuizEnded: () => {},
        numberOfQuestions: 2,
        results: [],
        setResults: () => {},
      },
    };
    customRender(<Quiz questions={parsedData} />, { providerProps });

    fireEvent.click(screen.getByText('Answer 1'));
    fireEvent.click(screen.getByText('Submit Answer'));

    expect(screen.getByText(/Your answer was correct/i)).toBeInTheDocument();

    fireEvent.click(screen.getByText('Next Question'));

    fireEvent.click(screen.getByText('Answer 2'));
    fireEvent.click(screen.getByText('Submit Answer'));

    expect(
      screen.getByText(/Your answer was not correct/i),
    ).toBeInTheDocument();
  });
});

describe('Conducting a multiple answer quiz', () => {
  it('shows that the answer was correct or not', () => {
    const providerProps = {
      value: {
        quizEnded: false,
        setQuizEnded: () => {},
        numberOfQuestions: 2,
        results: [],
        setResults: () => {},
      },
    };
    customRender(<Quiz questions={parsedData} />, { providerProps });

    // Selecting only one correct answer is not enough to succeed
    fireEvent.click(screen.getByText('Answer 1'));
    fireEvent.click(screen.getByText('Submit Answer'));

    expect(
      screen.getByText(/Your answer was not correct/i),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByText('Next Question'));

    // Selecting one false answer causes quiz to fail
    fireEvent.click(screen.getByText('Answer 1'));
    fireEvent.click(screen.getByText('Answer 2'));
    fireEvent.click(screen.getByText('Answer 3'));

    fireEvent.click(screen.getByText('Submit Answer'));

    expect(
      screen.getByText(/Your answer was not correct/i),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByText('Next Question'));

    // Selecting all correct answers is enough to succeed
    fireEvent.click(screen.getByText('Answer 1'));
    fireEvent.click(screen.getByText('Answer 3'));
    fireEvent.click(screen.getByText('Submit Answer'));

    expect(screen.getByText(/Your answer was correct/i)).toBeInTheDocument();
  });
});
