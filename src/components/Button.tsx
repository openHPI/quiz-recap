const Button = ({
  text,
  onClickAction,
}: {
  text: string;
  onClickAction: () => void;
}) => {
  return (
    <button
      type="button"
      className="qr-mb-2 qr-w-full qr-rounded qr-bg-primary qr-p-2 hover:qr-bg-primary-light focus:qr-bg-primary-light active:qr-bg-primary-light"
      onClick={() => {
        onClickAction();
      }}
    >
      {text}
    </button>
  );
};

export default Button;
