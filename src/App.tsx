import { useState } from 'react';
import classes from './App.module.css';
import { Data } from './types';
import Quiz from './components/Quiz';

function App(data: Data) {
  const [quizStarted, setQuizStarted] = useState(false);
  const [numberOfQuestions, setNumberOfQuestion] = useState(10);

  const completeSet = data.questions.length;
  const mediumSet = Math.floor(data.questions.length / 2);
  const quickSet = Math.floor(data.questions.length / 5);

  return (
    <div className={classes.app}>
      <h2>Quiz recap</h2>
      <div className={classes.content}>
        {quizStarted ? (
          <>
            <Quiz data={data} set={numberOfQuestions} />
            <button type="button" onClick={() => setQuizStarted(false)}>
              New Quiz
            </button>
          </>
        ) : (
          <div>
            <h3>Here you can practice your knowledge for the course!</h3>
            <p>
              Choose a quiz type depending on how many questions you want to
              practice now:
            </p>
            <p>
              After you decide for a quiz size you will get a random set of
              questions. Questions with one correct answer are indicated by a
              radio button. Those with multiple correct answers are indicated by
              a checkbox.
            </p>
            <p>
              Choose a quiz type depending on how many questions you want to
              practice now:
            </p>
            <ul>
              <li>
                <button
                  type="button"
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
  );
}

export default App;
