import { useState } from 'react';
import { Answer } from '../static/data';

const Answers = ({ answers, name }: { answers: Answer[]; name: string }) => {
  const [isCorrect, setIsCorrect] = useState(false);

  return (
    <div>
      {answers.map((answer) => (
        <div key={answer.id}>
          <input
            id={answer.id}
            type="radio"
            name={'answer'}
            value={answer.correct.toString()}
          ></input>
          <label htmlFor={answer.id}>{answer.text}</label>
        </div>
      ))}
    </div>
  );
};

export default Answers;
