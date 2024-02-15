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
      <div>
        {question && !quizEnded && (
          <>
            <Form question={question} nextQuestion={nextQuestion}></Form>
            <div className="qr-flex qr-flex-row-reverse">
              <button
                type="button"
                className="qr-mt-4 qr-rounded qr-bg-danger qr-p-2 qr-text-white hover:qr-bg-danger-dark focus:qr-bg-danger-dark active:qr-bg-danger-dark"
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
