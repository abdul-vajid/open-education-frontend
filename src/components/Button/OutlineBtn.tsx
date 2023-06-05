import React from 'react';

type OutlineBtnProps = {
    onClick?: any;
    btnText: string;
};

const OutlineBtn: React.FC<OutlineBtnProps> = ({ onClick, btnText }) => {
    return (
        <button className='border-[2px] border-light_primary font-semibold text-light_primary dark:border-dark_primary dark:text-dark_primary px-6 py-2 rounded cursor-pointer' onClick={onClick}>
            {btnText}
        </button>
    );
};

export default OutlineBtn;