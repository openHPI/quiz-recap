import { render, screen } from '@testing-library/react';
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
          points: 0,
          referenceLink: 'https://testing-library.com',
          type: QuestionTypes.SingleChoice,
          text: '',
          answers: [],
          remainingAttempts: 0,
          correctlyAnswered: true,
        },
      },
    ];

    const providerProps = {
      value: {
        results,
      },
    };

    customRender(<Result />, { providerProps });

    const referenceLink = screen.getByRole('link', { name: 'Link' });
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
          points: 0,
          type: QuestionTypes.SingleChoice,
          text: '',
          answers: [],
          remainingAttempts: 0,
          correctlyAnswered: true,
        },
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
});
