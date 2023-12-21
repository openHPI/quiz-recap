import { AnswerType, QuestionTypes, QuizType } from '../types';
import './Answers.css';

const Answers = ({
  type,
  answers,
  handleSelection,
}: {
  type: QuizType;
  answers: AnswerType[];
  handleSelection: (answer: AnswerType) => void;
}) => {
  const handleOnChange = (event: any): void => {
    const id = event.currentTarget.id;
    const answer = answers.find((answer) => {
      return answer.id === id;
    })!;
    handleSelection(answer);
  };

  return (
    <div className="answers" data-testid="answers">
      {answers.map((answer: AnswerType) => {
        return (
          <div key={answer.id} className="answers__answer">
            <input
              id={answer.id}
              type={
                type === QuestionTypes.MultipleChoice ? 'radio' : 'checkbox'
              }
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
