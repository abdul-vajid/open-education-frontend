import React from 'react';

type OutlineBtnProps = {
    onClick?: any;
    btnText: string;
    isDisabled?: boolean
};

const OutlineBtn: React.FC<OutlineBtnProps> = ({ onClick, btnText, isDisabled }) => {
    return (
        <button className='ring-2 ring-inset ring-light_primary font-semibold text-light_primary dark:ring-dark_primary dark:text-dark_primary px-6 py-2 rounded cursor-pointer disabled:cursor-default' onClick={onClick} disabled={isDisabled ? true : false}>
            {btnText}
        </button>
    );
};

export default OutlineBtn;