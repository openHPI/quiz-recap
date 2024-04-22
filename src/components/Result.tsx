import { useContext } from 'react';
import { ResultType } from '../types';
import { Context } from '../Context';
import Button from './Button';
import styles from './Result.module.scss';
import { useTranslation } from 'react-i18next';
import Markdown from './Markdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleCheck,
  faTimesCircle,
  faArrowUpRightFromSquare,
} from '@fortawesome/free-solid-svg-icons';

const Result = () => {
  const {
    results,
    numberOfQuestions,
    setQuizEnded,
    setQuizStarted,
    setResults,
  } = useContext(Context);
  const { t } = useTranslation();

  const correctAnswers = results.reduce(
    (accumulator: number, result: ResultType) =>
      result.question.correctlyAnswered
        ? (accumulator = accumulator + 1)
        : accumulator,
    0,
  );

  const referenceLinkPresent = results.some(
    (result) => result.question.referenceLink,
  );
  return (
    <div className={styles.result}>
      <h2 className={styles.h2}>{t('result.title')}</h2>
      {results.length ? (
        <table className={styles.table}>
          <caption className={styles.caption}>
            {t('result.overview', { correctAnswers, numberOfQuestions })}
          </caption>
          <thead>
            <tr>
              <th className={styles.th} aria-label={t('result.correct')}></th>
              <th className={styles.th}>{t('result.question')}</th>
              <th className={`${styles.th} ${styles.centered}`}>
                {t('result.attempts')}
              </th>
              {referenceLinkPresent && (
                <th className={`${styles.td} ${styles.centered}`}>
                  {t('result.reference')}
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {results.map((result: ResultType, index) => {
              return (
                <tr className={styles.tr} key={result.id}>
                  <td className={styles.td}>
                    {result.question.correctlyAnswered ? (
                      <FontAwesomeIcon
                        icon={faCircleCheck}
                        className={styles.correctIcon}
                        aria-label={t('result.correctAnswer')}
                        title={t('result.correctAnswer')}
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faTimesCircle}
                        className={styles.incorrectIcon}
                        aria-label={t('result.notCorrectAnswer')}
                        title={t('result.notCorrectAnswer')}
                      />
                    )}
                  </td>
                  <td className={styles.td}>
                    {<Markdown content={result.question.text}></Markdown>}
                  </td>
                  <td
                    className={`${styles.td} ${styles.centered}`}
                    data-testid={`attempts-question-${index + 1}`}
                  >
                    {`${3 - result.question.remainingAttempts}`}
                  </td>
                  <td className={`${styles.td} ${styles.centered}`}>
                    {result.question.referenceLink && (
                      <a target="_blank" href={result.question.referenceLink}>
                        <FontAwesomeIcon
                          icon={faArrowUpRightFromSquare}
                          className={styles.linkIcon}
                          aria-label={t('result.referenceLink')}
                          title={t('result.referenceLink')}
                        />
                      </a>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p>{t('result.unanswered')}</p>
      )}
      <div className={styles.buttonBar}>
        <Button
          text={t('result.new')}
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
