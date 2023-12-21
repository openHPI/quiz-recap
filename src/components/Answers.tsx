import { AnswerType, QuestionTypes, QuizType } from '../types';

const Answers = ({
  type,
  answers,
  showCorrect,
  handleSelection,
}: {
  type: QuizType;
  answers: AnswerType[];
  showCorrect: boolean;
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
    <div className="p-2" data-testid="answers">
      {answers.map((answer: AnswerType) => {
        return (
          <div key={answer.id} className="">
            <input
              id={answer.id}
              type={
                type === QuestionTypes.MultipleChoice ? 'radio' : 'checkbox'
              }
              name={'answer'}
              className="mr-2 pb-2"
              onChange={handleOnChange}
            ></input>
            <label htmlFor={answer.id}>
              {answer.text}
              {showCorrect && (
                <small>
                  {answer.correct ? ' (correct answer)' : ' (incorrect answer)'}
                </small>
              )}
            </label>
          </div>
        );
      })}
    </div>
  );
};

export default Answers;
