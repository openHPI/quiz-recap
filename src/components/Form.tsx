import { ChangeEvent, FormEvent, useState } from 'react';
import { Answer, Question as IQuestion } from '../static/data';
import Answers from './Answers';
import Question from './Question';

const Form = ({
  question,
  answers,
}: {
  question: IQuestion;
  answers: Answer[];
}) => {
  const [isCorrect, setIsCorrect] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [selectedAnswerValue, setSelectedAnswerValue] = useState(false);

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();
    setIsCorrect(selectedAnswerValue);
    setSubmitted(true);
  };

  const getBooleanValue = (value: string): boolean => {
    return value.toLowerCase() === 'true' ? true : false;
  };

  const handleRadioChange = (event: any) => {
    setSelectedAnswerValue(getBooleanValue(event.currentTarget.value));
  };

  return (
    <form onSubmit={submitHandler}>
      <Question text={question.text}></Question>
      {answers.map((answer) => (
        <div key={answer.id}>
          <input
            id={answer.id}
            type="radio"
            name={'answer'}
            value={answer.correct.toString()}
            onChange={handleRadioChange}
          ></input>
          <label htmlFor={answer.id}>{answer.text}</label>
        </div>
      ))}
      <button>Submit Answer</button>
      {submitted && <p>{isCorrect ? 'Correct' : 'Not correct'}</p>}
    </form>
  );
};

export default Form;
