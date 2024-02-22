import { FormEvent, useContext, useState } from 'react';
import { QuestionType, AnswerType, QuestionTypes } from '../types';
import { isAlreadySelected, validateSelectionIsCorrect } from '../util';
import Answers from './Answers';
import Question from './Question';
import { Context } from '../Context';

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
        <Question text={question.text} type={question.type}></Question>
        <Answers
          type={question.type}
          quizId={+question.id}
          answers={question.answers}
          showCorrect={submitted}
          handleSelection={handleSelections}
        ></Answers>
        {submitted && (
          <p className="qr-rounded qr-bg-white qr-pb-6">
            Your answer was {isCorrect ? ' correct ✅' : ' not correct ❌'}
          </p>
        )}
      </fieldset>
      <div className="flex-row qr-flex qr-justify-end">
        {!showConfirmation && (
          <>
            <button
              type="button"
              className="qr-mr-2 qr-rounded qr-bg-neutral qr-p-2 qr-text-white hover:qr-bg-neutral-dark focus:qr-bg-neutral-dark active:qr-bg-neutral-dark"
              onClick={() => {
                setShowConfirmation(true);
              }}
            >
              End Quiz
            </button>
            {!submitted && (
              <button className="qr-m7-2 qr-rounded qr-bg-primary qr-p-2 qr-text-white hover:qr-bg-primary-dark focus:qr-bg-primary-dark active:qr-bg-primary-dark">
                Submit Answer
              </button>
            )}
          </>
        )}
        {submitted && (
          <button
            type="button"
            className="qr-rounded qr-bg-primary qr-p-2 qr-text-white hover:qr-bg-primary-dark focus:qr-bg-primary-dark active:qr-bg-primary-dark"
            onClick={handleNextQuestion}
          >
            Next Question
          </button>
        )}
      </div>

      {showConfirmation && (
        <div className="flex-row qr-flex qr-items-center qr-justify-end">
          <h2 className="qr-mr-5">Are you sure you want to end the quiz?</h2>
          <div>
            <button
              type="button"
              className="qr-m7-2  qr-mr-2 qr-min-w-20 qr-rounded qr-bg-neutral qr-p-2 qr-text-white hover:qr-bg-neutral-dark focus:qr-bg-primary-dark active:qr-bg-neutral-dark"
              onClick={() => {
                setShowConfirmation(false);
              }}
            >
              No
            </button>
            <button
              type="button"
              className="qr-m7-2 qr-min-w-20 qr-rounded qr-bg-danger qr-p-2 qr-text-white hover:qr-bg-danger-dark focus:qr-bg-danger-dark active:qr-bg-danger-dark"
              onClick={() => {
                setQuizEnded(true);
              }}
            >
              Yes
            </button>
          </div>
        </div>
      )}
    </form>
  );
};

export default Form;
