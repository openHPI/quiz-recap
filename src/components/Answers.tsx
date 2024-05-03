import { useEffect, useState } from 'react';
import { AnswerType, QuestionTypes, QuizType } from '../types';
import styles from './Answers.module.scss';
import { useTranslation } from 'react-i18next';
import Markdown from './Markdown';

const Answers = ({
  type,
  quizId,
  answers,
  attempts,
  showCorrect,
  handleSelection,
}: {
  type: QuizType;
  quizId: number;
  answers: AnswerType[];
  attempts: number;
  showCorrect: boolean;
  handleSelection: (answer: AnswerType) => void;
}) => {
  const { t } = useTranslation();
  const [shuffledAnswers, setShuffledAnswers] = useState(answers);

  useEffect(() => {
    const shuffledAnswers = [...answers].sort(() => Math.random() - 0.5);
    setShuffledAnswers(shuffledAnswers);
  }, [answers]);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const id = event.currentTarget.id;
    const answer = answers.find((answer) => {
      return answer.id === id;
    })!;
    handleSelection(answer);
  };

  return (
    <div className={styles.container} data-testid="answers">
      {shuffledAnswers.map((answer: AnswerType) => {
        const indicatorClass = showCorrect
          ? answer.correct
            ? styles.correct
            : styles.wrong
          : styles.default;

        const correctHint = answer.correct
          ? t('answer.correct')
          : t('answer.incorrect');

        return (
          <div
            key={answer.id + '_' + quizId + '_' + attempts}
            className={`${styles.answers} ${indicatorClass}`}
          >
            <input
              id={answer.id}
              type={type === QuestionTypes.SingleChoice ? 'radio' : 'checkbox'}
              className={styles.input}
              name={'answer'}
              onChange={handleOnChange}
              disabled={showCorrect}
            ></input>
            <label className={styles.label} htmlFor={answer.id}>
              <div>
                <Markdown content={answer.text}></Markdown>
              </div>
              {showCorrect && (
                <p className={styles.correctHint}>{correctHint}</p>
              )}
            </label>
          </div>
        );
      })}
    </div>
  );
};

export default Answers;
