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
    setNumberOfQuestions,
  } = useContext(Context);

  const correctAnswers = results.reduce(
    (accumulator: number, result: ResultType) =>
      result.correctlyAnswered ? (accumulator = accumulator + 1) : accumulator,
    0,
  );
  return (
    <>
      <h3 className="pb-2 text-lg">Result</h3>
      {results.length ? (
        <table className="w-full">
          <caption className="pb-4 text-lg">
            You answered {correctAnswers} of {numberOfQuestions} correctly.
          </caption>
          <thead>
            <tr className="border-b border-neutral">
              <th aria-label="Correctly answered"></th>
              <th aria-label="Question Text"></th>
            </tr>
          </thead>
          <tbody>
            {results.map((result: ResultType) => {
              return (
                <tr
                  key={result.question.id}
                  className="border-b border-neutral"
                >
                  <td className="px-2 py-2">
                    {result.correctlyAnswered ? '✅' : '❌'}
                  </td>
                  <td className="px-2 py-2">{result.question.text}</td>
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
        className="mt-4 w-full rounded bg-success p-2 hover:bg-success-light focus:bg-success-light active:bg-success-light"
        onClick={() => {
          setQuizStarted(false);
          setQuizEnded(false);
          setResults([]);
          setNumberOfQuestions(0);
        }}
      >
        New Quiz
      </button>
    </>
  );
};

export default Result;
