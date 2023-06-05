import React from 'react'
import { IoArrowBack } from "react-icons/io5";

const BackArrowButton: React.FC = () => {
    return (
        <span className='text-light_primary_text dark:text-dark_primary_text cursor-pointer'>
            <IoArrowBack /> <br />
        </span>
    )
}

export default BackArrowButton