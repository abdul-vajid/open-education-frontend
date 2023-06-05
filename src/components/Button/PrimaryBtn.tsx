import React from 'react';

type PrimaryBtnProps = {
  onClick?: any;
  btnText: string;
  type?: "button" | "submit" | "reset"
};

const PrimaryBtn: React.FC<PrimaryBtnProps> = ({ onClick, btnText, type }) => {
  return (
    <button className= 'bg-light_primary font-semibold dark:bg-dark_primary text-light_primary_btn_text dark:text-dark_primary_btn_text  px-6 py-2 rounded cursor-pointer' type = {type? type : "button"} onClick={onClick}>
      {btnText}
    </button>
  );
};

export default PrimaryBtn;
