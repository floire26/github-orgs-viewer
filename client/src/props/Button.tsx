import React from 'react';

interface ButtonProps {
  value: string;
  onClick: (value: string) => void;
}

const Button: React.FC<ButtonProps> = ({ value, onClick }) => {
  return (
    <button onClick={() => onClick(value)}>
      {value}
    </button>
  );
};

export default Button;
