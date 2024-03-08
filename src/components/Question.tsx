import { QuestionTypes, QuizType } from '../types';
import styles from './Question.module.scss';

const Question = ({
  text,
  type,
  showResult,
  isCorrect,
}: {
  text: string;
  type: QuizType;
  showResult: boolean;
  isCorrect: boolean;
}) => {
  return (
    <div className={styles.question}>
      <p className={styles.p}>{text}</p>

      {showResult ? (
        <p className={styles.p}>
          Your answer was {isCorrect ? ' correct ✅' : ' not correct ❌'}
        </p>
      ) : (
        <p className={styles.p}>
          <em>
            {type === QuestionTypes.MultipleChoice
              ? 'Select all correct answers.'
              : 'Select the correct answer.'}
          </em>
        </p>
      )}
    </div>
  );
};

export default Question;
