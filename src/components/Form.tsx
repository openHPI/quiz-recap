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
  nextQuestion: Function;
}) => {
  const { results, setResults, numberOfQuestions } = useContext(Context);

  const [questionIndexText, setQuestionIndexText] = useState(1);
  const [isCorrect, setIsCorrect] = useState(false);
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
    if (question.type === QuestionTypes.MultipleChoice) {
      setSelections([selection]);
    } else {
      handleMultipleAnswerSelection(selection);
    }
  };

  const addToResult = (question: QuestionType, correctlyAnswered: boolean) => {
    setResults([
      ...results,
      {
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
      <fieldset className="rounded bg-white p-5">
        <legend className="rounded bg-white p-1">
          {questionIndexText} of {numberOfQuestions}
        </legend>
        <Question text={question.text} type={question.type}></Question>
        <Answers
          type={question.type}
          answers={question.answers}
          showCorrect={submitted}
          handleSelection={handleSelections}
        ></Answers>
        {submitted ? (
          <p className="mt-2 rounded bg-white p-2">
            Your answer was {isCorrect ? ' correct ✅' : ' not correct ❌'}
          </p>
        ) : (
          <button className="m7-2 w-full rounded bg-primary p-2 hover:bg-primary-light focus:bg-primary-light active:bg-primary-light">
            Submit Answer
          </button>
        )}
      </fieldset>
      {submitted && (
        <>
          <button
            type="button"
            className="mt-4 w-full rounded bg-primary p-2 hover:bg-primary-light focus:bg-primary-light active:bg-primary-light"
            onClick={handleNextQuestion}
          >
            Next Question
          </button>
        </>
      )}
    </form>
  );
};

export default Form;
