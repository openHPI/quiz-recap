import React, { useEffect, useState } from 'react';
import './App.css';
import Form from './components/Form';
import Result from './components/Result';
import { Data, Question, Answer, ResultType } from './types';

function App(data: Data) {
  const [question, setQuestion] = useState<Question>();
  const [answers, setAnswers] = useState<Answer[]>();
  const [questionIndex, setQuestionIndex] = useState(0);
  const [quizEnded, setQuizEnded] = useState(false);
  const [results, setResults] = useState<ResultType[]>([]);

  const getAnswers = (question: Question, allAnswers: Answer[]): Answer[] => {
    return question.answers.map((answerId) => {
      return allAnswers.find((answer) => answer.id === answerId)!;
    });
  };

  useEffect(() => {
    setQuestion(data.questions[questionIndex]);
    setAnswers(getAnswers(data.questions[questionIndex], data.answers));
  }, [data, questionIndex]);

  const nextQuestion = () => {
    if (questionIndex <= data.questions.length) {
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
    <main className="App">
      <h1>Quiz recap</h1>
      {question && answers && !quizEnded && (
        <React.Fragment>
          <Form
            question={question}
            answers={answers}
            nextQuestion={nextQuestion}
            handleResult={addToResult}
          ></Form>
          <button type="button" onClick={handleEndQuiz}>
            End Quiz
          </button>
        </React.Fragment>
      )}
      {quizEnded && (
        <React.Fragment>
          <Result results={results} />
          <button type="button" onClick={handleNewQuiz}>
            New Quiz
          </button>
        </React.Fragment>
      )}
    </main>
  );
}

export default App;
