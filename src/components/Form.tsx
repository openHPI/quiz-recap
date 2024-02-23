import { FormEvent, useContext, useState } from 'react';
import { QuestionType, AnswerType, QuestionTypes } from '../types';
import { isAlreadySelected, validateSelectionIsCorrect } from '../util';
import Answers from './Answers';
import Question from './Question';
import { Context } from '../Context';
import Button from './Button';

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
    <form onSubmit={submitHandler}>
      <fieldset className="qr-rounded qr-bg-white">
        <legend className="qr-rounded qr-bg-white qr-text-right qr-text-sm">
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

      <div className="qr-flex qr-justify-end">
        {!showConfirmation && (
          <>
            <Button
              text="End Quiz"
              onClickAction={() => {
                setShowConfirmation(true);
              }}
              style="neutral"
              additionalClasses="qr-mr-2"
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
        <div className="flex-row qr-flex qr-items-center qr-justify-end">
          <p className="qr-mr-5">Are you sure you want to end the quiz?</p>
          <div>
            <Button
              text="No"
              style="neutral"
              additionalClasses="qr-m7-2 qr-mr-2 qr-min-w-20"
              onClickAction={() => {
                setShowConfirmation(false);
              }}
            />
            <Button
              text="Yes"
              style="danger"
              additionalClasses="qr-m7-2 qr-min-w-20"
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
