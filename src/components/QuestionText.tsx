import { QuizType } from '../types';

const QuestionText = ({ text, type }: { text: string; type: QuizType }) => {
  return (
    <div>
      <p>{text}</p>
      <p>
        <em>
          {type === 'Xikolo::Quiz::MultipleAnswerQuestion'
            ? 'Select all correct answers.'
            : 'Select the correct answer'}
        </em>
      </p>
    </div>
  );
};

export default QuestionText;
