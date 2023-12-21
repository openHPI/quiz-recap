import React, { useEffect, useState } from 'react';
import './App.css';
import { exampleData, Data, Question, Answer } from './static/data';

function App() {
  const [data, setData] = useState<Data>({ questions: [], answers: [] });
  const [question, setQuestion] = useState<Question>();
  const [answers, setAnswers] = useState<Answer[]>();

  const getAnswers = (question: Question, allAnswers: Answer[]): Answer[] => {
    return question.answers.map((answerId) => {
      return allAnswers.find((answer) => answer.id === answerId)!;
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      setData({
        questions: exampleData.questions,
        answers: exampleData.answers,
      });
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (data.questions.length > 0 && data.answers.length > 0) {
      setQuestion(data.questions[0]);
      setAnswers(getAnswers(data.questions[0], data.answers));
    }
  }, [data]);

  return (
    <div className="App">
      <h1>Quiz recap</h1>
      <p>{question && question.text}</p>
      <ul>
        {answers &&
          answers.map((question) => {
            return <li key={question.id}>{question?.text}</li>;
          })}
      </ul>
    </div>
  );
}

export default App;
