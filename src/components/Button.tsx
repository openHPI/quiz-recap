import styles from './Button.module.scss';

const Button = ({
  text,
  onClickAction,
  style = 'primary',
  type = 'button',
  additionalClasses,
}: {
  text: string;
  onClickAction?: () => void;
  type?: 'button' | 'submit';
  style?: 'primary' | 'neutral' | 'success' | 'danger';
  additionalClasses?: string;
}) => {
  const classesBasedOnType = {
    primary: styles.primary,
    neutral: styles.neutral,
    success: styles.success,
    danger: styles.danger,
  };
  return (
    <button
      type={type}
      className={`${styles.button} + ${classesBasedOnType[style]} + ${additionalClasses}`}
      onClick={() => {
        onClickAction?.();
      }}
    >
      {text}
    </button>
  );
};

export default Button;
