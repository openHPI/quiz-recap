import { useEffect, useState } from 'react';
import classes from './App.module.css';
import Form from './components/Form';
import Result from './components/Result';
import { Data, Question, ResultType } from './types';
import { getAnswers, getRandomSet } from './util';

function App(data: Data) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [quizEnded, setQuizEnded] = useState(false);
  const [results, setResults] = useState<ResultType[]>([]);
  const [question, setQuestion] = useState<Question | null>(null);
  const [questionSet, setQuestionSet] = useState<Question[]>([]);

  useEffect(() => {
    const setOfQuestions = getRandomSet(data.questions, 10);
    setQuestionSet(setOfQuestions);
  }, [data, quizEnded]);

  useEffect(() => {
    setQuestion(questionSet[questionIndex]);
  }, [questionSet, questionIndex]);

  const nextQuestion = () => {
    if (questionIndex < questionSet.length - 1) {
      const nextQuestionIndex = questionIndex + 1;
      setQuestionIndex(nextQuestionIndex);
    } else {
      setQuizEnded(true);
    }
  };

  const handleEndQuiz = () => {
    setQuizEnded(true);
  };

  const handleNewQuiz = () => {
    setQuizEnded(false);
    setResults([]);
    setQuestionIndex(0);
  };

  const addToResult = (question: Question, correctlyAnswered: boolean) => {
    setResults([
      ...results,
      {
        question: question,
        correctlyAnswered: correctlyAnswered,
        attempts: 0,
        link: 'link',
      },
    ]);
  };

  return (
    <div className={classes.app}>
      <h2>Quiz recap</h2>
      <div className={classes.content}>
        {question && data.answers && !quizEnded && (
          <>
            <Form
              question={question}
              answers={getAnswers(question, data.answers)}
              nextQuestion={nextQuestion}
              handleResult={addToResult}
            ></Form>
            <button type="button" onClick={handleEndQuiz}>
              End Quiz
            </button>
          </>
        )}
        {quizEnded && (
          <>
            <Result results={results} totalQuestions={questionSet.length} />
            <button type="button" onClick={handleNewQuiz}>
              New Quiz
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
