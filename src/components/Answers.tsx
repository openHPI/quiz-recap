import { AnswerType, QuestionTypes, QuizType } from '../types';

const Answers = ({
  type,
  quizId,
  answers,
  showCorrect,
  handleSelection,
}: {
  type: QuizType;
  quizId: number;
  answers: AnswerType[];
  showCorrect: boolean;
  handleSelection: (answer: AnswerType) => void;
}) => {
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const id = event.currentTarget.id;
    const answer = answers.find((answer) => {
      return answer.id === id;
    })!;
    handleSelection(answer);
  };

  return (
    <div className="qr-p-2" data-testid="answers">
      {answers.map((answer: AnswerType) => {
        return (
          <div key={answer.id + '_' + quizId}>
            <label className="qr-w-100 qr-mb-2 qr-block qr-h-max qr-rounded qr-bg-neutral-light qr-p-2">
              <input
                id={answer.id}
                type={
                  type === QuestionTypes.SingleChoice ? 'radio' : 'checkbox'
                }
                name={'answer'}
                className="qr-mr-2 qr-pb-2"
                onChange={handleOnChange}
                disabled={showCorrect}
              ></input>
              {answer.text + ' '}
              {showCorrect && (
                <small
                  className={
                    showCorrect && answer.correct
                      ? ' qr-bg-success'
                      : ' qr-bg-danger'
                  }
                >
                  {answer.correct ? '(correct answer)' : '(incorrect answer)'}
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
