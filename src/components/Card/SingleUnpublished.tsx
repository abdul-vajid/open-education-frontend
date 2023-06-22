import React from 'react'
import { TCourse } from '../../app/types/types'
import UnpublishedCourseOptions from '../../containers/Dropdowns/UnpublishedCourseOptions'


type SingleUnpublishedCourseProps = {
    count: number,
    course: TCourse
    onClick?: () => void
    isOptionClicked: boolean
    optionBtnComponent: any
    closeButton: any
}

const SingleUnpublishedCourse: React.FC<SingleUnpublishedCourseProps> = ({ count, course, onClick, isOptionClicked,closeButton, optionBtnComponent }) => {
    return (
            <div className='w-full h-full p-4 mt-5 rounded-md bg-light_secondary_bg dark:bg-dark_secondary_bg' style={{ overflow: 'visible' }}>
                <div className='flex justify-between'>
                    <div className='flex gap-5' onClick={onClick}>
                        <div className='px-6 py-4 flex items-center justify-center rounded-md bg-light_primary_bg dark:bg-dark_primary_bg'>
                            <span className='text-light_primary_text dark:text-dark_primary_text text-lg md:text-xl'>{count}</span>
                        </div>
                        <div className='flex flex-col pb-3 pr-3 justify-between'>
                            <span className='text-md lg:text-lg text-light_primary_text dark:text-dark_primary_text'>{course.courseTitle}</span>
                            <span className='text-sm lg:text-md text-light_secondary_text dark:text-dark_secondary_text'>{course.fieldOfStudy}</span>
                        </div>
                    </div>
                    <div className='text-light_primary dark:text-dark_primary flex justify-center items-center mr-3'>
                        {
                           !isOptionClicked ? optionBtnComponent : closeButton
                        }
                    </div>
                </div>
                {
                    isOptionClicked && <div className='relative z-20 h-[10px] flex justify-end mt-[-10px]'>
                        <UnpublishedCourseOptions course={course}/>
                    </div>
                }

            </div>
    )
}

export default SingleUnpublishedCourse