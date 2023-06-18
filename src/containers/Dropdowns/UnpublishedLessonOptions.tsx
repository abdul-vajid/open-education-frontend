import React from 'react'
import { TCourse } from '../../app/types/types'
import useAxiosPrivate from '../../app/hooks/useAxiosPrivate'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../app/hooks/storeHooks'
import { clearCurrentCourse, setCurrentCourse } from '../../features/users/Tutor/currentCourseSlice'
import { fetchCourse } from '../../features/users/Tutor/tutorCoursesSlice'
import { TutorRoutes } from '../../app/types/enums'

type UnpublishedLessonOptionsProps = {
    course: TCourse
}

const UnpublishedLessonOptions: React.FC<UnpublishedLessonOptionsProps> = ({ course }) => {
    const location = useLocation();
    const axiosInstance = useAxiosPrivate();
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    enum Operations {
        view = "view-lesson",
        editLesson = "edit-lesson",
        setupValuations = "setup-valuation",
        quizes = "setup-quizes",
        deleteLesson = "delete-lesson"
    }

    const handleClick = (option: Operations) => {
        let navigation: TutorRoutes
        switch (option) {
            case Operations.view:
                navigation = TutorRoutes.courseDetails
                break;
            case Operations.editLesson:
                navigation = TutorRoutes.courseDetails
                break
            case Operations.setupValuations:
                navigation = TutorRoutes.setupValuation
                break
            case Operations.quizes:
                navigation = TutorRoutes.setupValuation
                break
            case Operations.deleteLesson:
                return;
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
                        <button onClick={() => handleClick(Operations.view)} className="block w-full text-left px-4 py-2 hover:bg-light_primary dark:hover:bg-dark_primary dark:hover:text-white">View Lesson</button>
                    </li>
                    <li>
                        <button onClick={() => handleClick(Operations.editLesson)} className="block w-full text-left px-4 py-2 hover:bg-light_primary dark:hover:bg-dark_primary dark:hover:text-white">Edit Lesson</button>
                    </li>
                    <li>
                        {
                            location.pathname == TutorRoutes.setupValuation ? <button onClick={() => handleClick(Operations.quizes)} className="block w-full text-left px-4 py-2 hover:bg-light_primary dark:hover:bg-dark_primary dark:hover:text-white">Quizes</button> :
                                <button onClick={() => handleClick(Operations.setupValuations)} className="block w-full text-left px-4 py-2 hover:bg-light_primary dark:hover:bg-dark_primary dark:hover:text-white">Setup Valuation</button>
                        }
                    </li>
                </ul>
                <div className="py-2">
                    <button onClick={() => handleClick(Operations.deleteLesson)} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-600 hover:text-white">Delete Lesson</button>
                </div>
            </div>
        </div>
    )
}

export default UnpublishedLessonOptions