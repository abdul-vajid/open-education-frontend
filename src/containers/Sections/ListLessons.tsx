import React, { useEffect, useState } from 'react'
import SingleLesson from '../../components/Card/SingleLesson'
import emptyBox from "../../utils/assets/empty-box.png"
import { useNavigate } from 'react-router-dom'
import {  useAppSelector } from '../../app/hooks/storeHooks'
import { SlOptions } from 'react-icons/sl'
import { IoMdClose } from 'react-icons/io'
import { TutorRoutes } from '../../app/types/enums'

type ListLessonsProps = {
    classNames?: string
    courseId: string | undefined
    navigationPath?: TutorRoutes
}

const ListLessons: React.FC<ListLessonsProps> = ({ classNames, courseId, navigationPath }) => {
    const navigate = useNavigate();
    const [optionsVisibility, setOptionsVisibility] = useState<number>(-1)
    const { course, courseDetailsAvailable } = useAppSelector(state => state.currentCourse)

    useEffect(() => {
        if (!courseDetailsAvailable || courseId != course._id) {
            navigate("/tutor/courses",
                {
                    replace: true
                });
        }
    }, [])

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
                    typeof course.lessons !== "string" ? course.lessons.map((lesson, i) => (
                            <SingleLesson lesson={lesson} key={i} lessonIndex={i + 1}
                                navigationPath={navigationPath}
                                optionBtnComponent={
                                    <SlOptions className="text-xl cursor-pointer"
                                        onClick={() => { optionsVisibility === i ? setOptionsVisibility(-1) : setOptionsVisibility(i) }} />}
                                isOptionClicked={optionsVisibility === i ? true : false}
                                closeButton={<IoMdClose className="text-xl cursor-auto"
                                    onClick={() => { optionsVisibility !== i ? setOptionsVisibility(i) : setOptionsVisibility(-1) }} />}
                            />
                    )) : <img src={emptyBox} alt="Empty Box" />
                }
            </ul>
        </div>
    )
}

export default ListLessons