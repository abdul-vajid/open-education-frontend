import React from 'react'
import { TCourse } from '../../app/types/types'

type SingleUnpublishedCourseProps = {
    count: number,
    course: TCourse
}

const SingleUnpublishedCourse: React.FC<SingleUnpublishedCourseProps> = ({ count, course }) => {
    return (
        <li>
            <div className='w-full p-4 mt-5 h-[120px] rounded-md bg-light_secondary_bg dark:bg-dark_secondary_bg'>
                <div className='flex gap-5'>
                    <div className='w-12 h-12 flex items-center justify-center rounded-md bg-light_primary_bg dark:bg-dark_primary_bg'>
                        <span className='text-light_primary_text dark:text-dark_primary_text text-lg md:text-xl'>{count}</span>
                    </div>
                    <div className='flex flex-col'>
                        <span className='text-md lg:text-lg text-light_primary_text dark:text-dark_primary_text'>{course.courseTitle}</span>
                        <span className='text-sm lg:text-md text-light_secondary_text dark:text-dark_secondary_text'>{course.fieldOfStudy}</span>
                    </div>
                </div>
            </div>
        </li>
    )
}

export default SingleUnpublishedCourse