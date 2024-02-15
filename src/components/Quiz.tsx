import { useContext, useState } from 'react';
import Form from './Form';
import Result from './Result';
import { Data, QuestionType } from '../types';
import { Context } from '../Context';

function Quiz({ questions }: { questions: Data }) {
  const { quizEnded, setQuizEnded } = useContext(Context);

  const [questionIndex, setQuestionIndex] = useState(0);
  const [question, setQuestion] = useState<QuestionType | null>(questions[0]);

  const nextQuestion = () => {
    if (questionIndex < questions.length - 1) {
      const nextQuestionIndex = questionIndex + 1;
      setQuestionIndex(nextQuestionIndex);
      setQuestion(questions[nextQuestionIndex]);
    } else {
      setQuizEnded(true);
    }
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
