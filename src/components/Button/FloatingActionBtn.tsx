import React from 'react'
import { AiOutlineFileAdd } from "react-icons/ai";

type FloatingActionBtnProps = {
    linkPath?: string
    btnText: string
    onClick?: any
}

const FloatingActionBtn: React.FC<FloatingActionBtnProps> = ({ btnText, onClick }) => {
    return (
        <button onClick={onClick} className='rounded-3xl shadow-lg text-light_primary_btn_text dark:text-dark_primary_btn_text shadow-light_primary_bg dark:shadow-dark_primary_bg fixed bottom-7 md:bottom-10 right-5 px-8 py-3 bg-light_primary dark:bg-dark_primary '>
            <div className='flex gap-2 items-center'>
                <AiOutlineFileAdd />
                {btnText}
            </div>
        </button>
    )
}

export default FloatingActionBtn