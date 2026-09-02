const Button = (props) => {
  const { className = "", type = "button", children, onClick, ...rest } = props;

  return (
    <button className={`button ${className}`} type={type} onClick={onClick} {...rest}>
      {children}
    </button>
  );
};

export default Button;
