import { QuestionTypes, QuizType } from '../types';

const QuestionText = ({ text, type }: { text: string; type: QuizType }) => {
  return (
    <div>
      <h3>{text}</h3>
      <p>
        <em>
          {type === QuestionTypes.MultipleAnswer
            ? 'Select all correct answers.'
            : 'Select the correct answer.'}
        </em>
      </p>
    </div>
  );
};

export default QuestionText;
