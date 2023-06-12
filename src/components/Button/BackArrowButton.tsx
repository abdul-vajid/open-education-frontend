import React from 'react'
import { IoArrowBack } from "react-icons/io5";

type BackArrowButtonProps = {
    classNames?: string
    onClick?: () => void
}

const BackArrowButton: React.FC<BackArrowButtonProps> = ({ classNames, onClick }) => {
    return (
        <div onClick={onClick} className={`text-light_primary_text dark:text-dark_primary_text cursor-pointer ${classNames}`}>
            <IoArrowBack /> <br />
        </div>
    )
}

export default BackArrowButton