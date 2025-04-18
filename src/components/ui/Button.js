import React from 'react';

const Button = ({ type = 'button', variant = 'primary', children, onClick, style }) => {
  let buttonClass = 'btn';
  
  if (variant === 'primary') {
    buttonClass += ' btn-primary';
  } else if (variant === 'danger') {
    buttonClass += ' btn-danger';
  } else if (variant === 'success') {
    buttonClass += ' btn-success';
  }
  
  return (
    <button
      type={type}
      className={buttonClass}
      onClick={onClick}
      style={style}
    >
      {children}
    </button>
  );
};

export default Button;