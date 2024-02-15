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
      className="qr-mb-2 qr-w-1/2 qr-rounded qr-bg-primary qr-p-2 qr-text-white hover:qr-bg-primary-dark focus:qr-bg-primary-dark active:qr-bg-primary-dark"
      onClick={() => {
        onClickAction();
      }}
    >
      {text}
    </button>
  );
};

export default Button;
