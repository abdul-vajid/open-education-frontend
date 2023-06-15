import React from 'react'
import { ILessonWithoutContent } from '../../app/types/interfaces'

type SingleLessonCourseProps = {
    lesson: ILessonWithoutContent
    lessonIndex: number
}

const SingleLesson: React.FC<SingleLessonCourseProps> = ({ lesson, lessonIndex }) => {
    return (
        <li>
            <div className='w-full p-4 mt-5 h-auto rounded-md bg-light_secondary_bg dark:bg-dark_secondary_bg'>
                <div className='flex gap-5'>
                    <div className='w-12 h-12 flex items-center justify-center rounded-md bg-light_primary_bg dark:bg-dark_primary_bg'>
                        <span className='text-light_primary_text dark:text-dark_primary_text text-lg md:text-xl'>{lessonIndex}</span>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <span className='text-md font font-semibold text-light_primary_text dark:text-dark_primary_text'>{lesson.lessonTitle}</span>
                        <span className='text-xs text-light_secondary_text dark:text-dark_secondary_text'>{lesson?.lessonDescription?.slice(0, 75)}...</span>
                    </div>
                </div>
            </div>
        </li>
    )
}

export default SingleLesson