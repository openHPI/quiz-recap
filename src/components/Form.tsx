import { FormEvent, useState } from 'react';
import { Question, Answer } from '../types';
import Answers from './Answers';
import QuestionText from './QuestionText';

const Form = ({
  question,
  answers,
  nextQuestion,
}: {
  question: Question;
  answers: Answer[];
  nextQuestion: Function;
}) => {
  const [isCorrect, setIsCorrect] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [formState, setFormState] = useState<Answer[]>([]);

  const correctAnswers: number = answers.filter((answer) => {
    return answer.correct;
  }).length;

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();
    setIsCorrect(formState.length === correctAnswers);
    setSubmitted(true);
    setFormState([]);
  };

  const handleAnswersState = (selection: Answer) => {
    if (question.type === 'Xikolo::Quiz::MultipleChoiceQuestion') {
      if (selection.correct) {
        setFormState([selection]);
      } else {
        setFormState([]);
      }
    } else {
      // is already in array => remove
      if (
        formState.find((item) => {
          return selection.id === item.id;
        })
      ) {
        setFormState((val) => {
          return val.filter((item) => {
            return item.id !== selection.id;
          });
        });
      } else {
        // add to array
        setFormState((oldValue) => {
          return [...oldValue, selection];
        });
      }
    }
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
          handleSelection={handleAnswersState}
        ></Answers>
        {!submitted && <button>Submit Answer</button>}
      </fieldset>
      <div>
        {submitted && (
          <p>Your answer was {isCorrect ? ' correct' : ' not correct'}</p>
        )}
        {submitted && (
          <button type="button" onClick={handleNextQuestion}>
            Next Question
          </button>
        )}
      </div>
    </form>
  );
};

export default Form;
