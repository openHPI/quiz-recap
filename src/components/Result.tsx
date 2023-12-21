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
        <caption>
          {results.length
            ? 'You did stuff! See below.'
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
