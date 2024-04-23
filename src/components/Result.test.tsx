import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Result from './Result';
import { Context } from '../Context';
import { translationsProvider } from '../util';
import { QuestionTypes, ResultType } from '../types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const customRender = (ui: any, { providerProps, ...renderOptions }: any) => {
  return render(<Context.Provider {...providerProps}>{ui}</Context.Provider>, {
    wrapper: translationsProvider,
    ...renderOptions,
  });
};

describe('Result component', () => {
  it('renders a reference link', () => {
    const results: ResultType[] = [
      {
        id: '',
        question: {
          id: '',
          referenceLink: 'https://testing-library.com',
          type: QuestionTypes.SingleChoice,
          text: '',
          answers: [],
          remainingAttempts: 0,
          correctlyAnswered: true,
        },
        selections: [],
      },
    ];

    const providerProps = {
      value: {
        results,
      },
    };

    customRender(<Result />, { providerProps });

    const referenceLink = screen.getByRole('link', { name: 'Open in new tab' });
    expect(referenceLink).toHaveAttribute(
      'href',
      'https://testing-library.com',
    );

    const referenceHeading = screen.queryByRole('columnheader', {
      name: 'Reference',
    });
    expect(referenceHeading).toBeInTheDocument();
  });

  it('does not render a reference link if there is no referenceLink in any question', () => {
    const results: ResultType[] = [
      {
        id: '',
        question: {
          id: '',
          type: QuestionTypes.SingleChoice,
          text: '',
          answers: [],
          remainingAttempts: 0,
          correctlyAnswered: true,
        },
        selections: [],
      },
    ];

    const providerProps = {
      value: {
        results,
      },
    };

    customRender(<Result />, { providerProps });

    const referenceLink = screen.queryByRole('link', { name: 'Link' });
    expect(referenceLink).not.toBeInTheDocument();

    const referenceHeading = screen.queryByRole('columnheader', {
      name: 'Reference',
    });
    expect(referenceHeading).not.toBeInTheDocument();
  });

  it('shows the answers when expanding a question', async () => {
    const user = userEvent.setup();
    const results: ResultType[] = [
      {
        id: '1',
        question: {
          id: '1',
          referenceLink: 'https://en.wikipedia.org/wiki/Mars',
          type: QuestionTypes.SingleChoice,
          text: 'Which planet is known as the Red Planet?',
          answers: [
            { id: 'jupiter', correct: false, text: 'Jupiter' },
            { id: 'mars', correct: true, text: 'Mars' },
          ],
          remainingAttempts: 0,
          correctlyAnswered: true,
        },
        selections: [{ id: 'mars', correct: true, text: 'Mars' }],
      },
    ];

    const providerProps = {
      value: {
        results,
      },
    };

    customRender(<Result />, { providerProps });

    // Answers are initially not visible
    let answer1 = screen.queryByRole('row', { name: /Mars/ });
    let answer2 = screen.queryByRole('row', { name: /Jupiter/ });

    expect(answer1).not.toBeInTheDocument();
    expect(answer2).not.toBeInTheDocument();

    const expandBtn = screen.getByRole('cell', { name: 'Expand' });
    await user.click(expandBtn);

    // Answers are visible after clicking the expand button
    answer1 = screen.getByRole('row', { name: /Mars/ });
    answer2 = screen.getByRole('row', { name: /Jupiter/ });

    expect(answer1).toBeInTheDocument();
    expect(answer2).toBeInTheDocument();

    const answer1Li = screen.getByText(/Mars/).closest('li');
    const answer2Li = screen.getByText(/Jupiter/).closest('li');

    expect(answer1Li).toHaveAttribute(
      'aria-description',
      'You selected this answer',
    );
    expect(answer2Li).not.toHaveAttribute(
      'aria-description',
      'You selected this answer',
    );
  });
});
