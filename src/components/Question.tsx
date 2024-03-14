import { QuestionTypes, QuizType } from '../types';
import styles from './Question.module.scss';
import { useTranslation } from 'react-i18next';
import Markdown from './Markdown';

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
  const { t } = useTranslation();
  return (
    <div className={styles.question}>
      <p className={styles.p}>
        <Markdown content={text}></Markdown>
      </p>

      {showResult ? (
        <p className={styles.p}>
          {isCorrect ? t('question.correct') : t('question.notCorrect')}
        </p>
      ) : (
        <p className={styles.p}>
          <em>
            {type === QuestionTypes.MultipleChoice
              ? t('question.selectAll')
              : t('question.selectOne')}
          </em>
        </p>
      )}
    </div>
  );
};

export default Question;
