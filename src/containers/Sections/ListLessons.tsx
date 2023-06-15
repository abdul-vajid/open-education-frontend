import React from 'react'
import SingleLesson from '../../components/Card/SingleLesson'
import emptyBox from "../../utils/assets/empty-box.png"
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks/storeHooks'

type ListLessonsProps = {
    classNames?: string
    courseId: string | undefined
}

const ListLessons: React.FC<ListLessonsProps> = ({ classNames, courseId }) => {
    const navigate = useNavigate();
    const { course, courseDetailsAvailable } = useAppSelector(state => state.currentCourse)

    if (!courseDetailsAvailable || courseId != course._id) {
        navigate("/tutor/courses",
            {
                replace: true
            });
    }

    return (
        <div className={`${classNames}bg-light_primary_bg dark:bg-dark_primary_bg h-full w-full lg:w-[60%] rounded-lg p-8`}>
            <div className='flex justify-between items-baseline'>
                <span className='text-light_primary_text dark:text-dark_primary_text text-lg md:text-xl lg:text-2xl font-semibold'>Lessons</span>
                <span className='text-light_secondary_text dark:text-dark_secondary_text text-sm md:text-md font-normal'>
                    {typeof course.lessons !== "string" ? `${course.lessons.length} Lessons` : 'No Lessons'}
                </span>
            </div>
            <ul>
                {
                    typeof course.lessons !== "string" ? course.lessons.map((lesson, index) => (
                        <SingleLesson lesson={lesson} key={index} lessonIndex={index+1} />
                    )) : <img src={emptyBox} alt="Empty Box" />
                }
            </ul>
        </div>
    )
}

export default ListLessons