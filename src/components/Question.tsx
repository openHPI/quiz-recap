import { QuestionTypes, QuizType } from '../types';

const Question = ({ text, type }: { text: string; type: QuizType }) => {
  return (
    <div>
      <p className="qr-pb-4 qr-text-lg">{text}</p>
      <p className="qr-pb-4">
        <em>
          {type === QuestionTypes.MultipleChoice
            ? 'Select all correct answers.'
            : 'Select the correct answer.'}
        </em>
      </p>
    </div>
  );
};

export default Question;
