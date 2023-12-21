import { Answer, QuizType } from '../types';

const Answers = ({
  type,
  answers,
  handleSelection,
}: {
  type: QuizType;
  answers: Answer[];
  handleSelection: (answer: Answer) => void;
}) => {
  const handleOnChange = (event: any): void => {
    const id = event.currentTarget.id;
    const answer = answers.find((answer) => {
      return answer.id === id;
    })!;
    handleSelection(answer);
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
