import { useEffect, useState } from 'react';
import './App.css';
import Form from './components/Form';
import { exampleData } from './static/data';
import { Data, Question, Answer } from './types';

function App() {
  const [data, setData] = useState<Data>({ questions: [], answers: [] });
  const [question, setQuestion] = useState<Question>();
  const [answers, setAnswers] = useState<Answer[]>();

  const getAnswers = (question: Question, allAnswers: Answer[]): Answer[] => {
    return question.answers.map((answerId) => {
      return allAnswers.find((answer) => answer.id === answerId)!;
    });
  };

  const fetchData = async () => {
    setData({
      questions: exampleData.questions,
      answers: exampleData.answers,
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (data.questions.length > 0 && data.answers.length > 0) {
      setQuestion(data.questions[1]);
      setAnswers(getAnswers(data.questions[1], data.answers));
    }
  }, [data]);

  return (
    <div className="App">
      <h1>Quiz recap</h1>
      {question && answers ? (
        <Form question={question} answers={answers}></Form>
      ) : (
        '...Loading'
      )}
    </div>
  );
}

export default App;
