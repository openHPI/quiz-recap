import { ResultType } from '../types';
import './Result.css';

const Result = ({ results }: { results: ResultType[] }) => {
  return (
    <div>
      <h2>Result</h2>
      <p>
        Quiz completed. You solved questions or not, the component does not know
        yet. But probably you did stuff.
      </p>
      <table>
        <caption>You did stuff! See below.</caption>
        <thead>
          <tr>
            <th></th>
            <th>Question</th>
            <th>Attempts</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result: ResultType) => {
            return (
              <tr key={result.id}>
                <td>{result.correct ? '✅' : '❌'}</td>
                <td>{result.text}</td>
                <td>{result.attempts}</td>
                <td>{result.link}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Result;
