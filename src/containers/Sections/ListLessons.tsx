import React from 'react'
import SingleLesson from '../../components/Card/SingleLesson'

type ListLessonsProps = {
    classNames?: string
}

const ListLessons: React.FC<ListLessonsProps> = ({ classNames }) => {
    return (
        <div className={`${classNames}bg-light_primary_bg dark:bg-dark_primary_bg h-full w-full lg:w-[60%] rounded-lg p-8`}>
            <div className='flex justify-between items-baseline'>
                <span className='text-light_primary_text dark:text-dark_primary_text text-lg md:text-xl lg:text-2xl font-semibold'>Lessons</span>
                <span className='text-light_secondary_text dark:text-dark_secondary_text text-sm md:text-md font-normal'>25 Lessons</span>

            </div>
            <ul>
                {[10, 20, 30, 40, 50, 60, 70].map((_x, i) => (
                    <SingleLesson count={i + 1} />
                ))}
            </ul>
        </div>
    )
}

export default ListLessons