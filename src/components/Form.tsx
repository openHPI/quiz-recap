import { FormEvent, useState } from 'react';
import { Question, Answer } from '../types';
import QuestionText from './QuestionText';

const Form = ({
  question,
  answers,
}: {
  question: Question;
  answers: Answer[];
}) => {
  const [isCorrect, setIsCorrect] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [selectedAnswerValue, setSelectedAnswerValue] = useState<
    boolean | null
  >(null);

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();

    if (selectedAnswerValue !== null) {
      setIsCorrect(selectedAnswerValue);
      setSubmitted(true);
    }
  };

  const getBooleanValue = (value: string): boolean => {
    return value.toLowerCase() === 'true' ? true : false;
  };

  const handleRadioChange = (event: any) => {
    setSelectedAnswerValue(getBooleanValue(event.currentTarget.value));
  };

  return (
    <form onSubmit={submitHandler}>
      <QuestionText text={question.text}></QuestionText>
      {answers.map((answer) => (
        <div key={answer.id}>
          <input
            id={answer.id}
            type="radio"
            name={'answer'}
            value={answer.correct.toString()}
            onChange={handleRadioChange}
            required
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
