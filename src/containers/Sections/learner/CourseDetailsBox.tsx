import React, { useEffect } from 'react'
import { useAppSelector } from '../../../app/hooks/storeHooks'
import { useNavigate } from 'react-router-dom'

type CourseDetailsBoxProps = {
    classNames?: string
}

const CourseDetailsBox: React.FC<CourseDetailsBoxProps> = ({ classNames }) => {
    const navigate = useNavigate()
    const { isCourseFetched, publicCourse } = useAppSelector(state => state.publicCurrent)

    useEffect(() => {
        if (!isCourseFetched) {
            navigate("/learner/courses",
                {
                    replace: true
                });
        }
    }, [])
    return (
        <div className={`${classNames}bg-light_primary_bg dark:bg-dark_primary_bg h-full rounded-lg p-8`}>
            <span className='text-light_primary_text dark:text-dark_primary_text text-lg md:text-xl lg:text-2xl font-semibold'>Course Details</span>

            <div className='flex gap-5 mt-5'>
                <div className='w-20 h-20 md:w-24 md:h-24 lg:w-44 lg:h-44 rounded-md bg-black'>
                </div>
                <div className='flex flex-col gap-5 mb-5 md:mb-8 lg:mb-12'>
                    <div className='flex flex-col gap-1'>
                        <span className='text-xl lg:text-2xl text-light_primary_text dark:text-dark_primary_text'>{publicCourse?.courseTitle}</span>
                        <span className='text-md lg:text-lg text-light_secondary_text dark:text-dark_secondary_text'>{publicCourse?.fieldOfStudy}</span>
                    </div>
                    <div>
                    </div>
                </div>
            </div>
            <div className='flex flex-col gap-3'>
                <span className='text-md lg:text-lg text-light_secondary_text dark:text-dark_secondary_text font-semibold'>Description</span>
                <span className=' text-light_secondary_text dark:text-dark_secondary_text text-sm font-extralight'>
                    {publicCourse.description}
                </span>
            </div>
        </div>
    )
}

export default CourseDetailsBox