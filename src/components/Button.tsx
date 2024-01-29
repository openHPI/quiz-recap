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
      className="mb-2 w-full rounded bg-primary p-2 hover:bg-primary-light focus:bg-primary-light active:bg-primary-light"
      onClick={() => {
        onClickAction();
      }}
    >
      {text}
    </button>
  );
};

export default Button;
