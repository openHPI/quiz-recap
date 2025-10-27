import { useState } from 'react';
import styles from './Result.module.scss';
import { ResultType } from '../types';
import { useTranslation } from 'react-i18next';
import ResultViewer from './ResultViewer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  faCircleCheck,
  faTimesCircle,
  faChevronDown,
  faChevronUp,
  faArrowUpRightFromSquare,
} from '@fortawesome/free-solid-svg-icons';

function ResultRow({ result, rowNum }: { result: ResultType; rowNum: number }) {
  const { t } = useTranslation();

  const [collapsed, setCollapsed] = useState(true);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <tr
      aria-expanded={!collapsed}
      className={`${styles.tr} ${collapsed ? styles.collapsed : ''} `}
      key={result.id}
      onClick={toggleCollapsed}
    >
      <td className={`${styles.td} ${styles.iconCell}`}>
        <FontAwesomeIcon
          icon={collapsed ? faChevronDown : faChevronUp}
          className={styles.chevronIcon}
          aria-label={collapsed ? t('result.expand') : t('result.collapse')}
          title={collapsed ? t('result.expand') : t('result.collapse')}
        />
      </td>
      <td
        className={`${styles.td} ${styles.iconCell} ${styles.correctlyAnswered}`}
      >
        {result.question.correctlyAnswered ? (
          <FontAwesomeIcon
            icon={faCircleCheck}
            className={styles.correctIcon}
            aria-label={t('result.correctAnswer')}
            title={t('result.correctAnswer')}
          />
        ) : (
          <FontAwesomeIcon
            icon={faTimesCircle}
            className={styles.incorrectIcon}
            aria-label={t('result.notCorrectAnswer')}
            title={t('result.notCorrectAnswer')}
          />
        )}
      </td>
      <td className={`${styles.td} ${styles.resultViewerCell}`}>
        <ResultViewer
          question={result.question}
          selectedAnswers={result.selections}
          collapsed={collapsed}
        />
      </td>
      <td
        className={`${styles.td} ${styles.centered}`}
        data-testid={`attempts-question-${rowNum + 1}`}
      >
        {`${3 - result.question.remainingAttempts}`}
      </td>
      <td className={`${styles.td} ${styles.centered}`}>
        {result.question.referenceLink && (
          <a
            target="_blank"
            href={result.question.referenceLink}
            aria-label={t('result.referenceLink')}
          >
            <FontAwesomeIcon
              icon={faArrowUpRightFromSquare}
              className={styles.linkIcon}
              title={t('result.referenceLink')}
            />
          </a>
        )}
      </td>
    </tr>
  );
}

export default ResultRow;
