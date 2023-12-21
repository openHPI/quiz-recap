import { useContext } from 'react';
import { ResultType } from '../types';
import { Context } from '../Context';

const Result = () => {
  const { results, numberOfQuestions, setQuizEnded, setQuizStarted } =
    useContext(Context);

  const correctAnswers = results.reduce(
    (accumulator: number, result: ResultType) =>
      result.correctlyAnswered ? (accumulator = accumulator + 1) : accumulator,
    0
  );
  return (
    <>
      <h3 className="text-lg pb-2">Result</h3>
      {results.length ? (
        <table className="w-full">
          <caption className="text-lg pb-4">
            You answered {correctAnswers} of {numberOfQuestions} correctly.
          </caption>
          <thead>
            <tr className="border-b border-neutral-500">
              <th aria-label="Correctly answered"></th>
              <th aria-label="Question Text"></th>
            </tr>
          </thead>
          <tbody>
            {results.map((result: ResultType) => {
              return (
                <tr
                  key={result.question.id}
                  className="border-b border-neutral-500"
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
        className="bg-green-300 rounded p-2 mt-4 w-full hover:bg-green-500 active:bg-green-500 focus:bg-green-500"
        onClick={() => {
          setQuizStarted(false);
          setQuizEnded(false);
        }}
      >
        New Quiz
      </button>
    </>
  );
};

export default Result;
