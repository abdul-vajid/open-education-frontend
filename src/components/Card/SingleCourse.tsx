import React from 'react'

const SingleCourse: React.FC = () => {
    return (
        <li>
            <div className='w-full p-4 mt-5 h-[160px] rounded-md bg-light_secondary_bg dark:bg-dark_secondary_bg'>
                <div className='flex gap-5'>
                    <div className='w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-md bg-black'>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <span className='text-lg lg:text-xl text-light_primary_text dark:text-dark_primary_text'>Course name</span>
                        <span className='text-md lg:text-lg text-light_secondary_text dark:text-dark_secondary_text'>Field of study</span>
                    </div>
                </div>
            </div>
        </li>
    )
}

export default SingleCourse