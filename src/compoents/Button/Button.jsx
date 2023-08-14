/* eslint-disable react/prop-types */
const Button = ({
  btnClickHandler,
  btnLabel,
  isDisabled,
  style,
  className,
}) => {
  // console.log('Button');
  return (
    <button
      onClick={btnClickHandler}
      disabled={isDisabled}
      style={style}
      className={className}
    >
      {btnLabel}
    </button>
  );
};

export default Button;
