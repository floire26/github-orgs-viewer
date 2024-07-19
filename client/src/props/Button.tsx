import React from 'react';

interface ButtonProps {
  value: string;
  sortType: string;
  selectedButton: string | null;
  onClick: (value: string) => void;
}

const Button: React.FC<ButtonProps> = ({ value, sortType, selectedButton, onClick }) => {
  return (
    <button className={'flex flex-row m-2 h-full bg-black/20 text-center'} onClick={() => onClick(value)}>
      {value}
      {
        sortType === "asc" && selectedButton === value ? <img src='./asc.svg' height={25} width={25}/> : null
      }
      {
        sortType === "desc1" && selectedButton === value ? <img src='./desc.svg' height={25} width={25}/> : null
      }
    </button>
  );
};

export default Button;
