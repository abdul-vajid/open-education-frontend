import React, { useState } from 'react'
import { SlOptions } from "react-icons/sl";
import { IoMdClose } from "react-icons/io";
import SingleUnpublishedCourse from '../../../components/Card/SingleUnpublished'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../app/hooks/storeHooks'
import LoaderCard from '../../../components/Card/LoaderCard'
import { TCourse } from '../../../app/types/types'
import { clearCurrentCourse, setCurrentCourse } from '../../../features/users/Tutor/currentCourseSlice'
import useAxiosPrivate from '../../../app/hooks/useAxiosPrivate'
import { fetchCourse } from '../../../features/users/Tutor/tutorCoursesSlice'

type NonPublishedCoursesProps = {
    classNames?: string
}

const NonPublishedCourses: React.FC<NonPublishedCoursesProps> = ({ classNames }) => {
    const axiosInstance = useAxiosPrivate();
    const [optionsVisibility, setOptionsVisibility] = useState<number>(-1)
    const navigate = useNavigate()
    const { loading } = useAppSelector((state: any) => state.tutorCourses)
    const unpublishedCourses: TCourse[] = useAppSelector((state: any) => state.tutorCourses.courses.unpublishedCourses)
    const dispatch = useAppDispatch()

    const handleClick = (course: TCourse) => {
        dispatch(clearCurrentCourse())
        if (course.lessons.length > 0) {
            dispatch(fetchCourse({ courseId: course._id, axiosInstance })).then((result) => {
                dispatch(setCurrentCourse(result.payload.courseDetails))
                navigate('/tutor/course/details')
            })
        } else {
            dispatch(clearCurrentCourse())
            dispatch(setCurrentCourse({
                _id: course._id,
                courseId: course._id,
                courseTitle: course.courseTitle,
                fieldOfStudy: course.fieldOfStudy,
                description: course.description,
                lessons: course.lessons,
                prerequisites: course.prerequisites,
                authorId: course.authorId,
                status: course.status,
                enrolledCount: course.enrolledCount,
                discountCoupons: course.discountCoupons,
                reviews: course.reviews
            }))
            navigate('/tutor/course/details')
        }
    }
    return (
        <div className={`${classNames}bg-light_primary_bg dark:bg-dark_primary_bg h-auto w-full rounded-lg p-8`}>
            <span className='text-light_primary_text dark:text-dark_primary_text text-lg md:text-xl lg:text-2xl font-semibold'>Unpublished Courses</span>
            <ul>

                {unpublishedCourses?.map((course, i) => (
                    <div className='hover:cursor-pointer' key={course._id}>
                        <SingleUnpublishedCourse
                            count={i + 1} course={course}
                            onClick={() => handleClick(course)}
                            optionBtnComponent={
                                <SlOptions className="text-xl"
                                    onClick={() => { optionsVisibility === i ? setOptionsVisibility(-1) : setOptionsVisibility(i) }} />}
                            isOptionClicked={optionsVisibility === i ? true : false}
                            closeButton={<IoMdClose className="text-xl"
                                onClick={() => { optionsVisibility !== i ? setOptionsVisibility(i) : setOptionsVisibility(-1) }} />}
                        />
                    </div>
                ))}
                {
                    loading && <LoaderCard />
                }
            </ul>
        </div>
    )
}

export default NonPublishedCourses