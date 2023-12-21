import { useEffect, useState } from 'react';
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
    setResults([
      {
        id: '1',
        correct: true,
        text: 'FooFoo',
        attempts: 1,
        link: 'link',
      },
      {
        id: '2',
        correct: false,
        text: 'Barbar',
        attempts: 3,
        link: 'link',
      },
    ]);
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

  return (
    <div className="App">
      <h1>Quiz recap</h1>
      {question && answers && !quizEnded && (
        <div>
          <Form
            question={question}
            answers={answers}
            nextQuestion={nextQuestion}
          ></Form>
          <button type="button" onClick={handleEndQuiz}>
            End Quiz
          </button>
        </div>
      )}
      {quizEnded && <Result results={results}></Result>}
    </div>
  );
}

export default App;
