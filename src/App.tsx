import { useEffect, useState } from 'react';
import './App.css';
import AppContext from './AppContext';
import Form from './components/Form';
import { exampleData } from './static/data';
import { Data, Question, Answer } from './types';

function App() {
  const [data, setData] = useState<Data>({ questions: [], answers: [] });
  const [question, setQuestion] = useState<Question>();
  const [answers, setAnswers] = useState<Answer[]>();
  const [questionIndex, setQuestionIndex] = useState(0);

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
      setQuestion(data.questions[questionIndex]);
      setAnswers(getAnswers(data.questions[questionIndex], data.answers));
    }
  }, [data, questionIndex]);

  const updateQuestionIndex = (value: number) => {
    setQuestionIndex(value);
  };

  return (
    <div className="App">
      <h1>Quiz recap</h1>
      {question && answers ? (
        <AppContext.Provider
          value={{ index: questionIndex, setIndex: updateQuestionIndex }}
        >
          <Form question={question} answers={answers}></Form>
        </AppContext.Provider>
      ) : (
        '...Loading'
      )}
    </div>
  );
}

export default App;
