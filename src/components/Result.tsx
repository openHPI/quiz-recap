import { useContext } from 'react';
import { ResultType } from '../types';
import { Context } from '../Context';

const Result = () => {
  const {
    results,
    numberOfQuestions,
    setQuizEnded,
    setQuizStarted,
    setResults,
    // setNumberOfQuestions,
  } = useContext(Context);

  const correctAnswers = results.reduce(
    (accumulator: number, result: ResultType) =>
      result.correctlyAnswered ? (accumulator = accumulator + 1) : accumulator,
    0,
  );
  return (
    <>
      <h3 className="qr-pb-2 qr-text-lg">Result</h3>
      {results.length ? (
        <table className="qr-w-full">
          <caption className="qr-pb-4 qr-text-lg">
            You answered {correctAnswers} of {numberOfQuestions} correctly.
          </caption>
          <thead>
            <tr className="qr-border-b qr-border-neutral">
              <th aria-label="Correctly answered"></th>
              <th aria-label="Question Text"></th>
            </tr>
          </thead>
          <tbody>
            {results.map((result: ResultType) => {
              return (
                <tr key={result.id} className="qr-border-b qr-border-neutral">
                  <td className="qr-px-2 qr-py-2">
                    {result.correctlyAnswered ? '✅' : '❌'}
                  </td>
                  <td className="qr-px-2 qr-py-2">{result.question.text}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p>You did not answer any questions.</p>
      )}
      <button
        type="button"
        className="qr-mt-8 qr-rounded qr-bg-success qr-p-2 qr-text-white hover:qr-bg-success-dark focus:qr-bg-success-dark active:qr-bg-success-dark"
        onClick={() => {
          setQuizStarted(false);
          setQuizEnded(false);
          setResults([]);
        }}
      >
        New Quiz
      </button>
    </>
  );
};

export default Result;
