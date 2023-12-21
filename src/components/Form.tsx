import { FormEvent, useContext, useState } from 'react';
import { Question, Answer, QuestionTypes } from '../types';
import { isAlreadySelected, validateSelectionIsCorrect } from '../util';
import Answers from './Answers';
import QuestionText from './QuestionText';
import './Form.css';
import { Context } from '../Context';

const Form = ({
  question,
  answers,
  nextQuestion,
}: {
  question: Question;
  answers: Answer[];
  nextQuestion: Function;
}) => {
  const { results, setResults } = useContext(Context);

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

  const addToResult = (question: Question, correctlyAnswered: boolean) => {
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
        <QuestionText text={question.text} type={question.type}></QuestionText>
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
