import { useEffect, useState } from 'react';
import './App.css';
import Form from './components/Form';
import { Data, Question, Answer } from './types';

function App(data: Data) {
  const [question, setQuestion] = useState<Question>();
  const [answers, setAnswers] = useState<Answer[]>();
  const [questionIndex, setQuestionIndex] = useState(0);

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
    const nextQuestionIndex = questionIndex + 1;
    setQuestionIndex(nextQuestionIndex);
  };

  return (
    <div className="App">
      <h1>Quiz recap</h1>
      {question && answers ? (
        <Form
          question={question}
          answers={answers}
          nextQuestion={nextQuestion}
        ></Form>
      ) : (
        '...Loading'
      )}
    </div>
  );
}

export default App;
