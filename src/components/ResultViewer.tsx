import styles from './ResultViewer.module.scss';
import Markdown from './Markdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSquareCheck,
  faCircleCheck,
} from '@fortawesome/free-solid-svg-icons';
import { faSquare, faCircle } from '@fortawesome/free-regular-svg-icons';

import { useTranslation } from 'react-i18next';
import { AnswerType, QuestionTypes, QuestionType } from '../types';

const ResultViewer = ({
  question,
  selectedAnswers,
  collapsed,
}: {
  question: QuestionType;
  selectedAnswers: AnswerType[];
  collapsed: boolean;
}) => {
  const { t } = useTranslation();

  const wasSelected = (answer: AnswerType) =>
    selectedAnswers.some((sel) => sel.id === answer.id);

  const indicatorClass = (answer: AnswerType) =>
    answer.correct ? styles.correct : styles.wrong;

  const selectedClass = (answer: AnswerType) =>
    wasSelected(answer) ? styles.selected : '';

  const correctHint = (answer: AnswerType) =>
    answer.correct ? t('viewer.correct') : t('viewer.incorrect');

  const icon = (answer: AnswerType) => {
    if (question.type === QuestionTypes.SingleChoice) {
      return wasSelected(answer) ? faCircleCheck : faCircle;
    } else {
      return wasSelected(answer) ? faSquareCheck : faSquare;
    }
  };

  return (
    <div className={collapsed ? styles.collapsed : ''}>
      <div className={styles.questionMarkdown}>
        {<Markdown content={question.text}></Markdown>}
      </div>
      <ul className={styles.answers} aria-hidden={collapsed}>
        {question.answers.map((answer: AnswerType) => (
          <li
            key={answer.id}
            className={`${styles.answer} ${indicatorClass(answer)} ${selectedClass(answer)}`}
            aria-description={wasSelected(answer) ? t('viewer.selected') : ''}
          >
            <FontAwesomeIcon
              icon={icon(answer)}
              className={styles.icon}
              aria-label={correctHint(answer)}
              title={correctHint(answer)}
            />
            <div className={styles.answerMarkdown}>
              <Markdown content={answer.text} />
            </div>
            <p className={styles.correctHint}>{correctHint(answer)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResultViewer;
