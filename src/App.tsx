import { useState } from 'react';
import { Data, ResultType } from './types';
import Quiz from './components/Quiz';
import Button from './components/Button';
import { Context } from './Context';
import { getRandomSet } from './util';

function App({ data }: { data: Data }) {
  const [quizStarted, setQuizStarted] = useState(false);
  const [numberOfQuestions, setNumberOfQuestions] = useState(data.length);

  const [quizEnded, setQuizEnded] = useState(false);
  const [results, setResults] = useState<ResultType[]>([]);

  const startQuiz = (questionsCount: number) => {
    setNumberOfQuestions(questionsCount);
    setQuizStarted(true);
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
      <div className="quiz-recap qr-rounded qr-bg-neutral-light qr-p-5">
        <h2 className="qr-pb-4 qr-text-xl">Quiz recap</h2>
        {quizStarted ? (
          <Quiz questions={getRandomSet(data, numberOfQuestions)} />
        ) : (
          <>
            <h3 className="qr-pb-2 qr-text-lg">
              Here you can practice your knowledge for the course!
            </h3>

            <p className="qr-pb-2">
              After you decide for a quiz size you will get a random set of
              questions. Questions with one correct answer are indicated by a
              radio button. Those with multiple correct answers are indicated by
              a checkbox.
            </p>
            <p className="qr-pb-4">
              Choose a quiz type below depending on how many questions you want
              to practice.
            </p>
            <ul>
              <li>
                <Button
                  text={`Complete set (all ${completeSet} questions)`}
                  onClickAction={() => startQuiz(completeSet)}
                />
              </li>
              <li>
                <Button
                  text={`Medium set (${mediumSet} questions)`}
                  onClickAction={() => startQuiz(mediumSet)}
                />
              </li>
              <li>
                <Button
                  text={`Quick set (${quickSet} questions)`}
                  onClickAction={() => startQuiz(quickSet)}
                />
              </li>
            </ul>
          </>
        )}
      </div>
    </Context.Provider>
  );
}

export default App;
