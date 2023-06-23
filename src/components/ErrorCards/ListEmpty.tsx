import React from 'react'
import emptyList from "../../utils/assets/empty-list.png"

type ListEmptyProps = {
    message?: string
}

const ListEmpty: React.FC<ListEmptyProps> = ({message}) => {
    return (
        <div className='flex flex-col justify-center items-center'>
            <img className='m-10 h-52 lg:h-64 w-52 lg:w-64 animate-pulse' src={emptyList} alt="" />
            <span className='text-sm lg:text-md text-light_primary_text dark:text-dark_primary_text font-semibold'>{message? message : "Oops! List empty"}</span>
        </div>
    )
}

export default ListEmpty