import React, { useEffect } from 'react'
import { useAppSelector } from '../../../app/hooks/storeHooks'
import { useNavigate } from 'react-router-dom'
import notFoundImage from "../../../utils/assets/image-not-found.png"
import PrimaryBtn from '../../../components/Button/PrimaryBtn'
import { MdOutlinePayments, MdSubject, MdOutlineQuiz } from 'react-icons/md'
import { FaUserGraduate } from "react-icons/fa"
import { LuFiles } from "react-icons/lu"
import AuthorCard from '../../../components/Card/AuthorCard'
import OutlineBtn from '../../../components/Button/OutlineBtn'
import { RiHeartAddLine } from 'react-icons/ri'

type CourseDetailsBoxProps = {
    classNames?: string
}

const CourseDetailsBox: React.FC<CourseDetailsBoxProps> = ({ classNames }) => {
    const navigate = useNavigate()
    const { isCourseFetched, course } = useAppSelector(state => state.publicCurrent)

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

            <div className='flex flex-col gap-5'>
                <div className='flex flex-col lg:flex-row gap-5 mt-5'>
                    <div className='w-auto lg:w-2/5 rounded-md'>
                        <img src={course.courseDetails.imageUrl !== "" ? course.courseDetails.imageUrl : notFoundImage} alt="Not available" />
                    </div>
                    <div className='w-full flex flex-col gap-5 mb-5 md:mb-8 lg:mb-0'>
                        <div className='w-full h-full flex flex-row justify-between'>
                            <div className='flex flex-col gap-3'>
                                <span
                                    className={`text-md lg:text-xl text-light_primary_text dark:text-dark_primary_text overflow-hidden ${course.courseDetails.courseTitle.length > 100 ? 'overflow-ellipsis' : ''
                                        }`}
                                    style={{
                                        display: '-webkit-box',
                                        WebkitLineClamp: course.courseDetails.courseTitle.length > 100 ? 2 : 'unset',
                                        WebkitBoxOrient: 'vertical',
                                        whiteSpace: 'normal',
                                        wordBreak: 'break-word',
                                        lineHeight: '1.5em',
                                        maxHeight: '4.6em',
                                    }}
                                >
                                    {course.courseDetails.courseTitle}
                                </span>                            <span className='text-sm text-light_secondary_text dark:text-dark_secondary_text flex items-center gap-2'><MdSubject /> {course.courseDetails.fieldOfStudy}</span>
                                <span className='text-sm text-light_secondary_text dark:text-dark_secondary_text flex items-center gap-2'><FaUserGraduate /> {course.courseDetails.enrolledCount !== undefined && course.courseDetails.enrolledCount < 100 ? "Below 100 Enrolls" : course.courseDetails.enrolledCount && course.courseDetails.enrolledCount >= 100 && course.courseDetails.enrolledCount && course.courseDetails.enrolledCount < 500 ? "100+ Enrolls" : "500+ Enrolls"}</span>
                                <span className='text-sm text-light_secondary_text dark:text-dark_secondary_text flex items-center gap-2'><MdOutlineQuiz /> {course.courseDetails.valuationMode}</span>
                                <span className='text-sm text-light_secondary_text dark:text-dark_secondary_text flex items-center gap-2'><LuFiles /> {course.courseDetails.totalLessons} Lessons</span>
                            </div>
                            <div>
                                <span className={`text-xs lg:text-sm text-light_primary_text dark:text-dark_primary_text rounded-full w-auto font-mono py-0.5 lg:py-1 px-3 bg-${course.courseDetails.difficulty === "Hard" ? "red" : course.courseDetails.difficulty === "Medium" ? "yellow" : "green"}-800 ring-2 ring-${course.courseDetails.difficulty === "Hard" ? "red" : course.courseDetails.difficulty === "Medium" ? "yellow" : "green"}-700`}>{course.courseDetails.difficulty} </span>
                            </div>
                        </div>
                        <div className='flex flex-row lg:flex-col gap-2 justify-between items-baseline'>
                            <span className='text-sm text-light_secondary_text dark:text-dark_secondary_text flex items-center gap-2'><MdOutlinePayments /> {course.courseDetails.paymentMode} payment</span>
                            <span className='text-md lg:text-5xl text-light_primary dark:text-dark_primary font-bold'>₹ {course.courseDetails.courseFee}</span>
                            <div className='hidden lg:flex mt-5 gap-4'>
                                <PrimaryBtn btnText='Enroll Now' />
                                <OutlineBtn btnText='Add To Wishlist' icon={<RiHeartAddLine/>}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col gap-3'>
                    <span className='text-md lg:text-lg text-light_secondary_text dark:text-dark_secondary_text font-semibold'>Description</span>
                    <span className=' text-light_secondary_text dark:text-dark_secondary_text text-sm font-extralight'>
                        {course.courseDetails.description}
                    </span>
                </div>
                <div className='flex justify-center mt-10'>
                    <AuthorCard user={course.authorDetails}/>
                </div>
            </div>
        </div>
    )
}

export default CourseDetailsBox