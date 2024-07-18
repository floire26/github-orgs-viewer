import React from 'react';

interface ButtonProps {
  value: string;
  onClick: (value: string) => void;
}

const Button: React.FC<ButtonProps> = ({ value, onClick }) => {
  return (
    <button className='m-2 bg-black/20' onClick={() => onClick(value)}>
      {value}
    </button>
  );
};

export default Button;
