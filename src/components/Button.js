import React from "react";

const Button = ({ onClick, label, disabled, color }) => {
  return (
    <button
      onClick={onClick}
      className="button"
      disabled={disabled}
      style={{ backgroundColor: color }}
    >
      {label}
    </button>
  );
};

export default Button;
