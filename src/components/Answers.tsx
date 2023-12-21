import { Answer, QuizType } from '../types';

const Answers = ({
  type,
  answers,
  handleSelection,
}: {
  type: QuizType;
  answers: Answer[];
  handleSelection: (event: any) => void;
}) => {
  const getBooleanValue = (value: string): boolean => {
    return value.toLowerCase() === 'true' ? true : false;
  };

  const handleOnChange = (event: any) => {
    // Has true or false
    if (type === 'Xikolo::Quiz::MultipleChoiceQuestion') {
      const value = getBooleanValue(event.currentTarget.value);
      handleSelection(value);
    } else {
      // has more than one correct answers
      throw new Error('Not implemented yet');
    }
  };

  const inputType = () => {
    if (type === 'Xikolo::Quiz::MultipleChoiceQuestion') {
      return 'radio';
    } else {
      return 'checkbox';
    }
  };

  return (
    <div>
      {answers.map((answer: Answer) => {
        return (
          <div key={answer.id}>
            <input
              id={answer.id}
              type={inputType()}
              name={'answer'}
              value={answer.correct.toString()}
              onChange={handleOnChange}
            ></input>
            <label htmlFor={answer.id}>
              {answer.text}
              <small>{'[' + answer.correct + ']'}</small>
            </label>
          </div>
        );
      })}
    </div>
  );
};

export default Answers;
