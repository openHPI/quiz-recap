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
    primary:
      'qr-bg-primary hover:qr-bg-primary-dark focus:qr-bg-primary-dark active:qr-bg-primary-dark ',
    neutral:
      'qr-bg-neutral hover:qr-bg-neutral-dark focus:qr-bg-neutral-dark active:qr-bg-neutral-dark ',
    success:
      'qr-bg-success hover:qr-bg-success-dark focus:qr-bg-success-dark active:qr-bg-success-dark ',
    danger:
      'qr-bg-danger hover:qr-bg-danger-dark focus:qr-bg-danger-dark active:qr-bg-danger-dark ',
  };
  return (
    <button
      type={type}
      className={
        'qr-rounded qr-p-2 qr-text-white ' +
        classesBasedOnType[style] +
        additionalClasses
      }
      onClick={() => {
        onClickAction && onClickAction();
      }}
    >
      {text}
    </button>
  );
};

export default Button;
