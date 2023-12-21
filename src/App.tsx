import { useState } from 'react';
import { Data, ResultType } from './types';
import Quiz from './components/Quiz';
import { Context } from './Context';

function App(data: Data) {
  const [quizStarted, setQuizStarted] = useState(false);
  const [numberOfQuestions, setNumberOfQuestion] = useState(
    data.questions.length
  );

  const [quizEnded, setQuizEnded] = useState(false);
  const [results, setResults] = useState<ResultType[]>([]);

  const completeSet = numberOfQuestions;
  const mediumSet = Math.floor(data.questions.length / 2);
  const quickSet = Math.floor(data.questions.length / 5);

  return (
    <Context.Provider
      value={{
        quizEnded,
        setQuizEnded,
        results,
        setResults,
        numberOfQuestions,
      }}
    >
      <div className="bg-gray-100 rounded p-5">
        <h2 className="text-xl pb-4">Quiz recap</h2>
        <div className="">
          {quizStarted ? (
            <>
              <Quiz data={data} />
              <button
                type="button"
                className="bg-green-300 rounded p-2 m-2 w-full hover:bg-green-500 active:bg-green-500 focus:bg-green-500"
                onClick={() => {
                  setQuizStarted(false);
                  setQuizEnded(false);
                }}
              >
                New Quiz
              </button>
            </>
          ) : (
            <div>
              <h3 className="text-lg pb-2">
                Here you can practice your knowledge for the course!
              </h3>

              <p className="pb-2">
                After you decide for a quiz size you will get a random set of
                questions. Questions with one correct answer are indicated by a
                radio button. Those with multiple correct answers are indicated
                by a checkbox.
              </p>
              <p className="pb-2">
                Choose a quiz type depending on how many questions you want to
                practice now:
              </p>
              <ul>
                <li>
                  <button
                    type="button"
                    className="bg-blue-300 rounded p-2 m-2 w-full hover:bg-blue-500 active:bg-blue-500 focus:bg-blue-500"
                    onClick={() => {
                      setNumberOfQuestion(completeSet);
                      setQuizStarted(true);
                    }}
                  >
                    Complete set (all {completeSet} questions)
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="bg-blue-300 rounded p-2 m-2 w-full hover:bg-blue-500 active:bg-blue-500 focus:bg-blue-500"
                    onClick={() => {
                      setNumberOfQuestion(mediumSet);
                      setQuizStarted(true);
                    }}
                  >
                    Medium set ({mediumSet} questions)
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="bg-blue-300 rounded p-2 m-2 w-full hover:bg-blue-500 active:bg-blue-500 focus:bg-blue-500"
                    onClick={() => {
                      setNumberOfQuestion(quickSet);
                      setQuizStarted(true);
                    }}
                  >
                    Quick set ({quickSet} questions)
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </Context.Provider>
  );
}

export default App;
