import { useState } from 'react';
import { Data, ResultType } from './types';
import Quiz from './components/Quiz';
import { Context } from './Context';

function App(data: Data) {
  const [quizStarted, setQuizStarted] = useState(false);
  const [numberOfQuestions, setNumberOfQuestions] = useState(
    data.questions.length,
  );

  const [quizEnded, setQuizEnded] = useState(false);
  const [results, setResults] = useState<ResultType[]>([]);

  const completeSet = data.questions.length;
  const mediumSet = Math.floor(data.questions.length / 2);
  const quickSet = Math.floor(data.questions.length / 5);

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
      <div className="rounded bg-gray-100 p-5">
        <h2 className="pb-4 text-xl">Quiz recap</h2>
        {quizStarted ? (
          <Quiz data={data} />
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
                <button
                  type="button"
                  className="m-2 w-full rounded bg-blue-300 p-2 hover:bg-blue-500 focus:bg-blue-500 active:bg-blue-500"
                  onClick={() => {
                    setNumberOfQuestions(completeSet);
                    setQuizStarted(true);
                  }}
                >
                  Complete set (all {completeSet} questions)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="m-2 w-full rounded bg-blue-300 p-2 hover:bg-blue-500 focus:bg-blue-500 active:bg-blue-500"
                  onClick={() => {
                    setNumberOfQuestions(mediumSet);
                    setQuizStarted(true);
                  }}
                >
                  Medium set ({mediumSet} questions)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="m-2 w-full rounded bg-blue-300 p-2 hover:bg-blue-500 focus:bg-blue-500 active:bg-blue-500"
                  onClick={() => {
                    setNumberOfQuestions(quickSet);
                    setQuizStarted(true);
                  }}
                >
                  Quick set ({quickSet} questions)
                </button>
              </li>
            </ul>
          </>
        )}
      </div>
    </Context.Provider>
  );
}

export default App;
