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
      <div className={styles.text}>
        <Markdown content={text}></Markdown>
      </div>

      {showResult ? (
        <p className={styles.hint}>
          {isCorrect ? t('question.correct') : t('question.notCorrect')}
        </p>
      ) : (
        <p className={styles.hint}>
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
