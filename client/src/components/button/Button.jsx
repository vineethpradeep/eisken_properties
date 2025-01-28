import PropTypes from "prop-types";
import "./button.scss";

const Button = ({ children, variant, onClick, type = "button" }) => {
  return (
    <button
      type={type}
      className={variant === "primary" ? "primary" : "secoundary"}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  children: PropTypes.node.isRequired,
  variant: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;
