import { useState, useEffect } from 'react';
import { Data, ResultType, QuestionPoolType } from './types';
import styles from './App.module.scss';

import Quiz from './components/Quiz';
import Button from './components/Button';
import { Context } from './Context';
import { getRandomSet } from './util';
import { useTranslation } from 'react-i18next';

import './i18n';

function App({ data, locale = 'en' }: { data: Data; locale?: string }) {
  const { t, i18n } = useTranslation();
  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [locale, i18n]);

  const [questions, setQuestions] = useState([] as Data);
  const [quizStarted, setQuizStarted] = useState(false);
  const [numberOfQuestions, setNumberOfQuestions] = useState(data.length);
  const [questionsPool, setQuestionsPool] = useState<QuestionPoolType[]>([]);

  const [quizEnded, setQuizEnded] = useState(false);
  const [results, setResults] = useState<ResultType[]>([]);

  const startQuiz = (questionsCount: number) => {
    setNumberOfQuestions(questionsCount);
    setQuizStarted(true);
    setQuestions(getRandomSet(data, questionsCount));
  };

  const completeSet = data.length;
  const mediumSet = Math.ceil(completeSet / 2);
  const quickSet = Math.ceil(completeSet / 5);

  return (
    <Context.Provider
      value={{
        quizEnded,
        setQuizEnded,
        setQuizStarted,
        results,
        setResults,
        numberOfQuestions,
        setNumberOfQuestions,
        questionsPool,
        setQuestionsPool,
      }}
    >
      <div className="quiz-recap">
        <div className={styles.quizRecap}>
          {quizStarted ? (
            <Quiz questions={questions} />
          ) : (
            <>
              <h2 className={styles.h2}>{t('app.title')}</h2>
              <h3 className={styles.h3}>{t('app.practice')}</h3>

              <p className={styles.p}>{t('app.intro')}</p>
              <p className={styles.p}>{t('app.instructions')}</p>
              <ul className={styles.ul}>
                <li className={styles.li}>
                  <Button
                    text={t('app.completeBtn', { count: completeSet })}
                    onClickAction={() => startQuiz(completeSet)}
                    additionalClasses={styles.button}
                  />
                </li>
                <li className={styles.li}>
                  <Button
                    text={t('app.mediumBtn', { count: mediumSet })}
                    onClickAction={() => startQuiz(mediumSet)}
                    additionalClasses={styles.button}
                  />
                </li>
                <li className={styles.li}>
                  <Button
                    text={t('app.quickBtn', { count: quickSet })}
                    onClickAction={() => startQuiz(quickSet)}
                    additionalClasses={styles.button}
                  />
                </li>
              </ul>
            </>
          )}
        </div>
      </div>
    </Context.Provider>
  );
}

export default App;
