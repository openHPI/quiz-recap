import { FormEvent, useState } from 'react';
import { Question, Answer, QuestionTypes } from '../types';
import { isAlreadySelected, validateSelectionIsCorrect } from '../util';
import Answers from './Answers';
import QuestionText from './QuestionText';
import './Form.css';

const Form = ({
  question,
  answers,
  nextQuestion,
  handleResult,
}: {
  question: Question;
  answers: Answer[];
  nextQuestion: Function;
  handleResult: Function;
}) => {
  const [isCorrect, setIsCorrect] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [selections, setSelections] = useState<Answer[]>([]);

  const deselectAnswer = (selection: Answer) => {
    setSelections((val) => {
      return val.filter((item) => {
        return item.id !== selection.id;
      });
    });
  };

  const addToAnswers = (selection: Answer) => {
    setSelections((oldValue) => {
      return [...oldValue, selection];
    });
  };

  const handleMultipleAnswerSelection = (selection: Answer) => {
    if (isAlreadySelected(selections, selection)) {
      deselectAnswer(selection);
    } else {
      addToAnswers(selection);
    }
  };

  const handleSelections = (selection: Answer) => {
    if (question.type === QuestionTypes.MultipleChoice) {
      setSelections([selection]);
    } else {
      handleMultipleAnswerSelection(selection);
    }
  };

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();
    const correctlyAnswered = validateSelectionIsCorrect(answers, selections);
    setIsCorrect(correctlyAnswered);
    setSubmitted(true);
    setSelections([]);
    handleResult(question, correctlyAnswered);
  };

  const handleNextQuestion = () => {
    setSubmitted(false);
    nextQuestion();
  };

  return (
    <form onSubmit={submitHandler}>
      <fieldset disabled={submitted}>
        <QuestionText text={question.text} type={question.type}></QuestionText>
        <Answers
          type={question.type}
          answers={answers}
          handleSelection={handleSelections}
        ></Answers>
        {!submitted && <button>Submit Answer</button>}
      </fieldset>
      {submitted && (
        <p>Your answer was {isCorrect ? ' correct' : ' not correct'}</p>
      )}
      {submitted && (
        <button type="button" onClick={handleNextQuestion}>
          Next Question
        </button>
      )}
    </form>
  );
};

export default Form;
