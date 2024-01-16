import { useContext, useEffect, useState } from 'react';
import Form from './Form';
import Result from './Result';
import { QuestionType } from '../types';
import { Context } from '../Context';

function Quiz({ questions }: { questions: QuestionType[] }) {
  const { quizEnded, setQuizEnded } = useContext(Context);

  const [questionIndex, setQuestionIndex] = useState(0);
  const [question, setQuestion] = useState<QuestionType | null>(questions[0]);
  const [questionSet, setQuestionSet] = useState<QuestionType[]>([]);

  useEffect(() => {
    setQuestionSet(questions);
  }, [questions]);

  const nextQuestion = () => {
    if (questionIndex < questionSet.length - 1) {
      const nextQuestionIndex = questionIndex + 1;
      setQuestionIndex(nextQuestionIndex);
      setQuestion(questionSet[nextQuestionIndex]);
    } else {
      setQuizEnded(true);
    }
  };

  return (
    <div data-testid="quiz">
      <div>
        {question && !quizEnded && (
          <>
            <Form question={question} nextQuestion={nextQuestion}></Form>
            <div className="flex flex-row-reverse">
              <button
                type="button"
                className="mt-4 rounded bg-danger p-2 hover:bg-danger-light focus:bg-danger-light active:bg-danger-light"
                onClick={() => {
                  setQuizEnded(true);
                }}
              >
                End Quiz
              </button>
            </div>
          </>
        )}
        {quizEnded && <Result />}
      </div>
    </div>
  );
}

export default Quiz;
