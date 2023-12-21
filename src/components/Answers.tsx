import { Answer, QuestionTypes, QuizType } from '../types';
import './Answers.css';

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
    if (type === QuestionTypes.MultipleChoice) {
      return 'radio';
    } else {
      return 'checkbox';
    }
  };

  return (
    <div className="answers" data-testid="answers">
      {answers.map((answer: Answer) => {
        return (
          <div key={answer.id} className="answers__answer">
            <input
              id={answer.id}
              type={inputType()}
              name={'answer'}
              onChange={handleOnChange}
            ></input>
            <label htmlFor={answer.id}>
              {answer.text}
              {/* <small>{'[' + answer.correct + ']'}</small> */}
            </label>
          </div>
        );
      })}
    </div>
  );
};

export default Answers;
