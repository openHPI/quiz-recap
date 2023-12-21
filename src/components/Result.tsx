import { ResultType } from '../types';
import './Result.css';

const Result = ({
  results,
  totalQuestions,
}: {
  results: ResultType[];
  totalQuestions: number;
}) => {
  const correctAnswers = results.reduce(
    (accumulator, result) =>
      result.correctlyAnswered ? (accumulator = accumulator + 1) : accumulator,
    0
  );
  return (
    <div>
      <h3>Result</h3>
      {results.length ? (
        <table>
          <caption>
            You answered {correctAnswers} of {totalQuestions} correctly.
          </caption>
          <thead>
            <tr>
              <th aria-label="Correctly answered"></th>
              <th>Question</th>
              {/* <th>Attempts</th>
            <th>Link</th> */}
            </tr>
          </thead>
          <tbody>
            {results.map((result: ResultType) => {
              return (
                <tr key={result.question.id}>
                  <td>{result.correctlyAnswered ? '✅' : '❌'}</td>
                  <td>{result.question.text}</td>
                  {/* <td>{result.attempts}</td>
                <td>{result.link}</td> */}
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p>You did not answer any questions.</p>
      )}
    </div>
  );
};

export default Result;
