import React from 'react'
import { IoArrowBack } from "react-icons/io5";

type BackArrowButtonProps = {
    classNames?: string
}

const BackArrowButton: React.FC<BackArrowButtonProps> = ({classNames}) => {
    return (
        <div className={`text-light_primary_text dark:text-dark_primary_text cursor-pointer ${classNames}`}>
            <IoArrowBack /> <br />
        </div>
    )
}

export default BackArrowButton