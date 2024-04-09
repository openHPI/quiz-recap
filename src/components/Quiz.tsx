import { useContext, useState, useEffect } from 'react';
import Form from './Form';
import Result from './Result';
import { Data, QuestionPoolType } from '../types';
import { Context } from '../Context';

function Quiz({ questions }: { questions: Data }) {
  const { questionsPool, setQuestionsPool, quizEnded, setQuizEnded } =
    useContext(Context);

  const [questionIndex, setQuestionIndex] = useState(0);
  const [question, setQuestion] = useState<QuestionPoolType | null>();

  useEffect(() => {
    // Initialize pool of questions
    const pool = questions.map((question) => ({
      ...question,
      remainingAttempts: 3,
      correctlyAnswered: false,
    }));
    setQuestionsPool(pool);
    setQuestion(pool[0]);
  }, [questions, setQuestionsPool]);

  const setNewIndex = () => {
    const nextQuestionIndex =
      questionIndex + 1 >= questionsPool.length ? 0 : questionIndex + 1;

    setQuestionIndex(nextQuestionIndex);
    setQuestion(questionsPool[nextQuestionIndex]);
  };

  const nextQuestion = () => {
    // Go to next question or end quiz
    questionsPool.length > 0 ? setNewIndex() : setQuizEnded(true);
  };

  return (
    <div data-testid="quiz">
      {question && !quizEnded && (
        <Form question={question} nextQuestion={nextQuestion}></Form>
      )}
      {quizEnded && <Result />}
    </div>
  );
}

export default Quiz;
