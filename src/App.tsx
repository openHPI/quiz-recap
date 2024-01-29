import { useState } from 'react';
import { Data, ResultType } from './types';
import Quiz from './components/Quiz';
import Button from './components/Button';
import { Context } from './Context';
import { assignAnswersToQuestions, getRandomSet } from './util';

function App(data: Data) {
  const [quizStarted, setQuizStarted] = useState(false);
  const [numberOfQuestions, setNumberOfQuestions] = useState(
    data.questions.length,
  );

  const [quizEnded, setQuizEnded] = useState(false);
  const [results, setResults] = useState<ResultType[]>([]);

  const questions = assignAnswersToQuestions(data);

  const startQuiz = (questionsCount: number) => {
    setNumberOfQuestions(questionsCount);
    setQuizStarted(true);
  };

  const completeSet = questions.length;
  const mediumSet = Math.floor(completeSet / 2);
  const quickSet = Math.floor(completeSet / 5);

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
      <div className="rounded bg-neutral-light p-5">
        <h2 className="pb-4 text-xl">Quiz recap</h2>
        {quizStarted ? (
          <Quiz questions={getRandomSet(questions, numberOfQuestions)} />
        ) : (
          <>
            <h3 className="pb-2 text-lg">
              Here you can practice your knowledge for the course!
            </h3>

            <p className="pb-2">
              After you decide for a quiz size you will get a random set of
              questions. Questions with one correct answer are indicated by a
              radio button. Those with multiple correct answers are indicated by
              a checkbox.
            </p>
            <p className="pb-4">
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
                  text={`Medium set (all ${mediumSet} questions)`}
                  onClickAction={() => startQuiz(mediumSet)}
                />
              </li>
              <li>
                <Button
                  text={`Quick set (all ${quickSet} questions)`}
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
