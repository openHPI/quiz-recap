import { FormEvent, useContext, useState } from 'react';
import { QuestionType, AnswerType, QuestionTypes } from '../types';
import { isAlreadySelected, validateSelectionIsCorrect } from '../util';
import Answers from './Answers';
import Question from './Question';
import './Form.css';
import { Context } from '../Context';

const Form = ({
  question,
  answers,
  nextQuestion,
}: {
  question: QuestionType;
  answers: AnswerType[];
  nextQuestion: Function;
}) => {
  const { results, setResults } = useContext(Context);

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
        question: question,
        correctlyAnswered: correctlyAnswered,
        attempts: 0,
        link: 'link',
      },
    ]);
  };

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();
    const correctlyAnswered = validateSelectionIsCorrect(answers, selections);
    setIsCorrect(correctlyAnswered);
    setSubmitted(true);
    setSelections([]);
    addToResult(question, correctlyAnswered);
  };

  const handleNextQuestion = () => {
    setSubmitted(false);
    nextQuestion();
  };

  return (
    <form onSubmit={submitHandler}>
      <fieldset disabled={submitted}>
        <Question text={question.text} type={question.type}></Question>
        <Answers
          type={question.type}
          answers={answers}
          handleSelection={handleSelections}
        ></Answers>
        {!submitted && <button>Submit Answer</button>}
      </fieldset>
      {submitted && (
        <>
          <button type="button" onClick={handleNextQuestion}>
            Next Question
          </button>
          <p>Your answer was {isCorrect ? ' correct ✅' : ' not correct ❌'}</p>
        </>
      )}
    </form>
  );
};

export default Form;
