import { FormEvent, useContext, useState } from 'react';
import { QuestionType, AnswerType, QuestionTypes } from '../types';
import { isAlreadySelected, validateSelectionIsCorrect } from '../util';
import Answers from './Answers';
import Question from './Question';
import { Context } from '../Context';
import Button from './Button';
import styles from './Form.module.scss';

const Form = ({
  question,
  nextQuestion,
}: {
  question: QuestionType;
  nextQuestion: () => void;
}) => {
  const { results, setResults, setQuizEnded, numberOfQuestions } =
    useContext(Context);

  const [questionIndexText, setQuestionIndexText] = useState(1);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [selections, setSelections] = useState<AnswerType[]>([]);

  const deselectAnswer = (selection: AnswerType) => {
    setSelections((val) => {
      return val.filter((item) => {
        return item.id !== selection.id;
      });
    });
  };

  const addToAnswers = (selection: AnswerType) => {
    setSelections((oldValue) => {
      return [...oldValue, selection];
    });
  };

  const handleMultipleAnswerSelection = (selection: AnswerType) => {
    if (isAlreadySelected(selections, selection)) {
      deselectAnswer(selection);
    } else {
      addToAnswers(selection);
    }
  };

  const handleSelections = (selection: AnswerType) => {
    if (question.type === QuestionTypes.SingleChoice) {
      setSelections([selection]);
    } else {
      handleMultipleAnswerSelection(selection);
    }
  };

  const addToResult = (question: QuestionType, correctlyAnswered: boolean) => {
    setResults([
      ...results,
      {
        id: `{${question.id}}-${new Date().getTime()}`,
        question,
        correctlyAnswered,
      },
    ]);
  };

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();

    const correctlyAnswered = validateSelectionIsCorrect(
      question.answers,
      selections,
    );
    setIsCorrect(correctlyAnswered);
    setSubmitted(true);
    setSelections([]);
    addToResult(question, correctlyAnswered);
  };

  const handleNextQuestion = () => {
    setQuestionIndexText(questionIndexText + 1);
    setSubmitted(false);
    nextQuestion();
  };

  return (
    <form onSubmit={submitHandler} className={styles.form}>
      <fieldset className={`${styles.form} ${styles.fieldset}`}>
        <legend className={`${styles.form} ${styles.legend}`}>
          {questionIndexText} of {numberOfQuestions}
        </legend>
        <Question
          text={question.text}
          type={question.type}
          showResult={submitted}
          isCorrect={isCorrect}
        />
        <Answers
          type={question.type}
          quizId={+question.id}
          answers={question.answers}
          showCorrect={submitted}
          handleSelection={handleSelections}
        ></Answers>
      </fieldset>

      <div className={styles.buttonBar}>
        {!showConfirmation && (
          <>
            <Button
              text="End Quiz"
              onClickAction={() => {
                setShowConfirmation(true);
              }}
              style="neutral"
              additionalClasses={styles.endQuizButton}
            />

            {!submitted && <Button text="Submit Answer" type="submit" />}
          </>
        )}

        {!showConfirmation && submitted && (
          <Button
            text="Next Question"
            type="button"
            onClickAction={handleNextQuestion}
          />
        )}
      </div>
      {showConfirmation && (
        <div className={styles.confirmation}>
          <p className={`${styles.confirmation} ${styles.p}`}>
            Are you sure you want to end the quiz?
          </p>
          <div>
            <Button
              text="No"
              style="neutral"
              additionalClasses={styles.declineButton}
              onClickAction={() => {
                setShowConfirmation(false);
              }}
            />
            <Button
              text="Yes"
              style="danger"
              additionalClasses={styles.confirmButton}
              onClickAction={() => {
                setQuizEnded(true);
              }}
            />
          </div>
        </div>
      )}
    </form>
  );
};

export default Form;
