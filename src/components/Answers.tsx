import { Answer } from '../types';

const Answers = ({
  answers,
  handleSelection,
}: {
  answers: Answer[];
  handleSelection: (event: any) => void;
}) => {
  const getBooleanValue = (value: string): boolean => {
    return value.toLowerCase() === 'true' ? true : false;
  };

  const handleOnChange = (event: any) => {
    const value = getBooleanValue(event.currentTarget.value);
    handleSelection(value);
  };

  return (
    <div>
      {answers.map((answer: Answer) => {
        return (
          <div key={answer.id}>
            <input
              id={answer.id}
              type="radio"
              name={'answer'}
              value={answer.correct.toString()}
              onChange={handleOnChange}
              required
            ></input>
            <label htmlFor={answer.id}>{answer.text}</label>
          </div>
        );
      })}
    </div>
  );
};

export default Answers;
