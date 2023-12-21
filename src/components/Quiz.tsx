import { useContext, useEffect, useState } from 'react';
import classes from './Quiz.module.css';
import Form from './Form';
import Result from './Result';
import { Data, QuestionType } from '../types';
import { getAnswers, getRandomSet } from '../util';
import { Context } from '../Context';

function Quiz({ data }: { data: Data; set?: number }) {
  const { quizEnded, setQuizEnded, numberOfQuestions } = useContext(Context);

  const [questionIndex, setQuestionIndex] = useState(0);
  const [question, setQuestion] = useState<QuestionType | null>(null);
  const [questionSet, setQuestionSet] = useState<QuestionType[]>([]);

  useEffect(() => {
    const setOfQuestions = getRandomSet(data.questions, numberOfQuestions);
    setQuestionSet(setOfQuestions);
  }, [data, quizEnded, numberOfQuestions]);

  useEffect(() => {
    setQuestion(questionSet[questionIndex]);
  }, [questionSet, questionIndex]);

  const nextQuestion = () => {
    if (questionIndex < questionSet.length - 1) {
      const nextQuestionIndex = questionIndex + 1;
      setQuestionIndex(nextQuestionIndex);
    } else {
      setQuizEnded(true);
    }
  };

  return (
    <div className={classes.app} data-testid="quiz">
      <div className={classes.content}>
        {question && data.answers && !quizEnded && (
          <>
            <Form
              question={question}
              answers={getAnswers(question, data.answers)}
              nextQuestion={nextQuestion}
            ></Form>
            <button
              type="button"
              onClick={() => {
                setQuizEnded(true);
              }}
            >
              End Quiz
            </button>
          </>
        )}
        {quizEnded && <Result />}
      </div>
    </div>
  );
}

export default Quiz;
