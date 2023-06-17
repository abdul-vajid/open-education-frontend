import React, { useState } from 'react'
import { TCourse } from '../../app/types/types'
import useAxiosPrivate from '../../app/hooks/useAxiosPrivate'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks/storeHooks'
import { clearCurrentCourse, setCurrentCourse } from '../../features/users/Tutor/currentCourseSlice'
import { fetchCourse } from '../../features/users/Tutor/tutorCoursesSlice'
import { TutorRoutes } from '../../app/types/enums'

type UnpublishedCourseOptionsProps = {
    course: TCourse
}

const UnpublishedCourseOptions: React.FC<UnpublishedCourseOptionsProps> = ({ course }) => {
    const axiosInstance = useAxiosPrivate();
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    enum Operations {
        view = "view-course",
        addLesson = "add-lesson",
        hostCourse = "host-course",
        deleteCourse = "delete-course"
    }

    const handleClick = (option: Operations) => {
        if (option === Operations.deleteCourse) {
            return
        }
        let navigation: TutorRoutes
        switch (option) {
            case Operations.view:
                navigation = TutorRoutes.courseDetails
                break;
            case Operations.addLesson:
                navigation = TutorRoutes.createLesson
                break
        }
        dispatch(clearCurrentCourse())
        if (course.lessons.length > 0) {
            dispatch(fetchCourse({ courseId: course._id, axiosInstance })).then((result) => {
                dispatch(setCurrentCourse(result.payload.courseDetails))
                navigate(navigation)
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
        <div>
            <div id="dropdownDotsHorizontal" className="z-10 bg-light_primary_bg divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-dark_primary_bg dark:divide-gray-600">
                <ul className="py-2 text-sm text-light_primary_text dark:text-dark_primary_text" aria-labelledby="dropdownMenuIconHorizontalButton">
                    <li>
                        <button onClick={() => handleClick(Operations.view)} className="block w-full text-left px-4 py-2 hover:bg-light_primary dark:hover:bg-dark_primary dark:hover:text-white">View Course</button>
                    </li>
                    <li>
                        <button onClick={() => handleClick(Operations.hostCourse)} disabled={course.lessons.length > 0 ? false : true} className="block w-full disabled:text-fade_text disabled:hover:text-fade_text text-left px-4 py-2 hover:bg-light_primary dark:hover:bg-dark_primary disabled:hover:bg-transparent disabled:dark:hover:bg-transparent hover:text-white">Host Course</button>
                    </li>
                    <li>
                        <button onClick={() => handleClick(Operations.addLesson)} className="block w-full text-left px-4 py-2 hover:bg-light_primary dark:hover:bg-dark_primary dark:hover:text-white">Add Lesson</button>
                    </li>
                </ul>
                <div className="py-2">
                    <button onClick={() => handleClick(Operations.deleteCourse)} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-600 hover:text-white">Delete Course</button>
                </div>
            </div></div>
    )
}

export default UnpublishedCourseOptions