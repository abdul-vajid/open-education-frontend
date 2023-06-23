import React from 'react'
import { TPublishedCourse } from '../../../app/types/types'
import notFoundImage from "../../utils/assets/image-not-found.png"
import { HiPencilSquare } from "react-icons/hi2";

type SingleCourseProps = {
    course: TPublishedCourse
    onClick?: ()=> void
}


const SingleCourse: React.FC<SingleCourseProps> = ({ course, onClick}) => {
    return (
        <li>
            <div className='w-full p-4 mt-5 h-auto rounded-md bg-light_secondary_bg dark:bg-dark_secondary_bg' onClick={onClick} style={{ overflow: 'visible' }} >
                <div className='flex gap-5'>
                    <div className='w-64 rounded-md'>
                        <img src={course.imageUrl != "" ? course.imageUrl : notFoundImage} alt="Not available" />
                    </div>
                    <div className='flex flex-col justify-between md:gap-1 w-full'>
                        <div className='flex flex-row justify-between'>
                            <div className='flex flex-col gap-3'>
                                <span className='text-md lg:text-xl text-light_primary_text dark:text-dark_primary_text'>{course.courseTitle}</span>
                                <div className='flex flex-row justify-start items-center gap-2'><HiPencilSquare className='text-sm text-light_secondary_text dark:text-dark_secondary_text'/><span className='text-sm text-light_secondary_text dark:text-dark_secondary_text'>{course.authorDetails.fullname}</span></div>
                                <span className='text-sm text-light_secondary_text dark:text-dark_secondary_text'>Filed of study : {course.fieldOfStudy}</span>
                                <span className='text-sm text-light_secondary_text dark:text-dark_secondary_text'>{course.enrolledCount < 100 ? "Below 100 Enrolls" : course.enrolledCount >= 100 && course.enrolledCount < 500 ? "100+ Enrolls" : "500+ Enrolls"}</span>
                            </div>
                            <div>
                            <span className={`text-sm text-light_primary_text dark:text-dark_primary_text rounded-full w-auto font-bold py-0.5 px-3 bg-${course.difficulty==="Hard"?"red":course.difficulty==="Medium"?"yellow":"green"}-800 ring-2 ring-${course.difficulty==="Hard"?"red":course.difficulty==="Medium"?"yellow":"green"}-700`}>{course.difficulty} </span>
                            </div>
                        </div>
                        <div className='flex flex-row justify-between items-baseline'>
                            <span className='text-sm text-light_secondary_text dark:text-dark_secondary_text'>{course.valuationMode} Valuation</span>
                            <span className='text-md lg:text-3xl text-light_primary dark:text-dark_primary font-bold'>₹ {course.courseFee}</span>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    )
}

export default SingleCourse