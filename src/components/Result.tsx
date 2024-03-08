import { useContext } from 'react';
import { ResultType } from '../types';
import { Context } from '../Context';
import Button from './Button';
import styles from './Result.module.scss';

const Result = () => {
  const {
    results,
    numberOfQuestions,
    setQuizEnded,
    setQuizStarted,
    setResults,
  } = useContext(Context);

  const correctAnswers = results.reduce(
    (accumulator: number, result: ResultType) =>
      result.correctlyAnswered ? (accumulator = accumulator + 1) : accumulator,
    0,
  );
  return (
    <div className={styles.result}>
      <h3 className={styles.h3}>Result</h3>
      {results.length ? (
        <table className={styles.table}>
          <caption className={styles.caption}>
            You answered {correctAnswers} of {numberOfQuestions} correctly.
          </caption>
          <thead>
            <tr>
              <th aria-label="Correctly answered"></th>
              <th aria-label="Question Text"></th>
            </tr>
          </thead>
          <tbody>
            {results.map((result: ResultType) => {
              return (
                <tr className={styles.tr} key={result.id}>
                  <td className={styles.td}>
                    {result.correctlyAnswered ? '✅' : '❌'}
                  </td>
                  <td className={styles.td}>{result.question.text}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p>You did not answer any questions.</p>
      )}
      <div className={styles.buttonBar}>
        <Button
          text="New Quiz"
          onClickAction={() => {
            setQuizStarted(false);
            setQuizEnded(false);
            setResults([]);
          }}
        />
      </div>
    </div>
  );
};

export default Result;
