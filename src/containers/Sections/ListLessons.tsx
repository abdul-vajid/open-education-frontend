import React from 'react'
import SingleLesson from '../../components/Card/SingleLesson'
import { ILessonWithoutContent } from '../../app/types/interfaces'
import emptyBox from "../../utils/assets/empty-box.png"

type ListLessonsProps = {
    classNames?: string
    lessons?: ILessonWithoutContent[] | string
}

const ListLessons: React.FC<ListLessonsProps> = ({ classNames, lessons }) => {
    return (
        <div className={`${classNames}bg-light_primary_bg dark:bg-dark_primary_bg h-full w-full lg:w-[60%] rounded-lg p-8`}>
            <div className='flex justify-between items-baseline'>
                <span className='text-light_primary_text dark:text-dark_primary_text text-lg md:text-xl lg:text-2xl font-semibold'>Lessons</span>
                <span className='text-light_secondary_text dark:text-dark_secondary_text text-sm md:text-md font-normal'>
                    {lessons ? `${lessons.length} Lessons` : 'No Lessons'}
                </span>
            </div>
            <ul>
                {
                    lessons && typeof lessons !== "string" ? lessons.map((lesson) => (
                        <SingleLesson count={lesson.lessonIndex} key={lesson.lessonIndex} />
                    )) : <img src={emptyBox} alt="Empty Box" />
                }
            </ul>
        </div>
    )
}

export default ListLessons