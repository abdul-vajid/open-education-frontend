import React, { useEffect } from 'react'
import { useAppSelector } from '../../app/hooks/storeHooks'
import { CourseStatus, TutorRoutes } from '../../app/types/enums'
import PrimaryBtn from '../../components/Button/PrimaryBtn'
import { Link, useNavigate } from 'react-router-dom'

type CourseDetailsBoxProps = {
    classNames?: string
}

const CourseDetailsBox: React.FC<CourseDetailsBoxProps> = ({ classNames }) => {
    const navigate = useNavigate()
    const { course, courseDetailsAvailable } = useAppSelector(state => state.currentCourse)

    useEffect(() => {
        if (!courseDetailsAvailable) {
            navigate("/tutor/courses",
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
                        <span className='text-xl lg:text-2xl text-light_primary_text dark:text-dark_primary_text'>{course?.courseTitle}</span>
                        <span className='text-md lg:text-lg text-light_secondary_text dark:text-dark_secondary_text'>{course?.fieldOfStudy}</span>
                    </div>
                    <div>
                        {
                            course.status === CourseStatus.Draft ? <span className='text-sm text-yellow-400'>This course is not hosted yet, Complete your course ASAP!</span> :
                                <span className='text-light_primary dark:text-dark_primary text-lg md:text-xl lg:text-3xl font-semibold'>{course.courseFee}</span>
                        }
                        {
                            <div className='mt-5'>
                                <Link to={TutorRoutes.hostCourse}>
                                    <PrimaryBtn btnText='Host your Course Now' />
                                </Link>
                            </div>
                        }
                    </div>
                </div>
            </div>
            <div className='flex flex-col gap-3'>
                <span className='text-md lg:text-lg text-light_secondary_text dark:text-dark_secondary_text font-semibold'>Description</span>
                <span className=' text-light_secondary_text dark:text-dark_secondary_text text-sm font-extralight'>
                    {course.description}
                </span>
            </div>
        </div>
    )
}

export default CourseDetailsBox