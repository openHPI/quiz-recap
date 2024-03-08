import { useState } from 'react';
import { Data, ResultType } from './types';
import styles from './App.module.scss';

import Quiz from './components/Quiz';
import Button from './components/Button';
import { Context } from './Context';
import { getRandomSet } from './util';

function App({ data }: { data: Data }) {
  const [questions, setQuestions] = useState([] as Data);
  const [quizStarted, setQuizStarted] = useState(false);
  const [numberOfQuestions, setNumberOfQuestions] = useState(data.length);

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
      }}
    >
      <div className="quiz-recap">
        <div className={styles.quizRecap}>
          {quizStarted ? (
            <Quiz questions={questions} />
          ) : (
            <>
              <h2 className={styles.h2}>Quiz recap</h2>
              <h3 className={styles.h3}>
                Here you can practice your knowledge!
              </h3>

              <p className={styles.p}>
                After you decide for a quiz size you will get a random set of
                questions. Questions with one correct answer are indicated by a
                radio button. Those with multiple correct answers are indicated
                by a checkbox.
              </p>
              <p className={styles.p}>
                Choose a quiz type below depending on how many questions you
                want to practice.
              </p>
              <ul className={styles.ul}>
                <li className={styles.li}>
                  <Button
                    text={`Complete set (all ${completeSet} questions)`}
                    onClickAction={() => startQuiz(completeSet)}
                    additionalClasses={styles.button}
                  />
                </li>
                <li className={styles.li}>
                  <Button
                    text={`Medium set (${mediumSet} questions)`}
                    onClickAction={() => startQuiz(mediumSet)}
                    additionalClasses={styles.button}
                  />
                </li>
                <li className={styles.li}>
                  <Button
                    text={`Quick set (${quickSet} questions)`}
                    onClickAction={() => startQuiz(quickSet)}
                    additionalClasses={styles.button}
                  />
                </li>
              </ul>
            </>
          )}{' '}
        </div>
      </div>
    </Context.Provider>
  );
}

export default App;
