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
      <h2>Result</h2>
      <table>
        <caption>
          {results.length
            ? `You answered ${correctAnswers} of ${totalQuestions} correctly.`
            : 'You did not answer any questions'}
        </caption>
        <thead>
          <tr>
            <th></th>
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
    </div>
  );
};

export default Result;
