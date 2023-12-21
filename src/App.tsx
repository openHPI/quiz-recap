import React, { useEffect, useState } from 'react';
import './App.css';
import Form from './components/Form';
import Result from './components/Result';
import { Answer, Data, Question, ResultType } from './types';

function App(data: Data) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [quizEnded, setQuizEnded] = useState(false);
  const [results, setResults] = useState<ResultType[]>([]);
  const [question, setQuestion] = useState<Question | null>(null);
  const [questionSet, setQuestionSet] = useState<Question[]>([]);

  useEffect(() => {
    const setOfQuestions = data.questions
      .sort(() => 0.5 - Math.random())
      .slice(0, 10);

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

  const getAnswers = (question: Question, allAnswers: Answer[]): Answer[] => {
    return question.answers.map((answerId) => {
      return allAnswers.find((answer) => answer.id === answerId)!;
    });
  };

  return (
    <main className="App">
      <h1>Quiz recap</h1>
      {question && data.answers && !quizEnded && (
        <React.Fragment>
          <Form
            question={question}
            answers={getAnswers(question, data.answers)}
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
