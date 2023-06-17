import React from 'react'
import SingleUnpublishedCourse from '../../components/Card/SingleUnpublished'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks/storeHooks'
import LoaderCard from '../../components/Card/LoaderCard'
import { TCourse } from '../../app/types/types'
import { clearCurrentCourse, setCurrentCourse } from '../../features/users/Tutor/currentCourseSlice'
import useAxiosPrivate from '../../app/hooks/useAxiosPrivate'
import { fetchCourse } from '../../features/users/Tutor/tutorCoursesSlice'

type NonPublishedCoursesProps = {
    classNames?: string
}

const NonPublishedCourses: React.FC<NonPublishedCoursesProps> = ({ classNames }) => {
    const axiosInstance = useAxiosPrivate();
    const navigate = useNavigate()
    const { loading } = useAppSelector(state => state.tutorCourses)
    const unpublishedCourses: TCourse[] = useAppSelector(state => state.tutorCourses.courses.unpublishedCourses)
    const dispatch = useAppDispatch()

    const handleClick = (course: TCourse) => {
        dispatch(clearCurrentCourse())
        if (course.lessons.length > 0) {
            console.log("log 1 course.lesson.length is > 0")
            dispatch(fetchCourse({ courseId: course._id, axiosInstance })).then((result) => {
                dispatch(setCurrentCourse(result.payload.courseDetails))
            })
            navigate('/tutor/course/details')
        } else {
            console.log("log 1 course.lesson.length else > 0")
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
        <div className={`${classNames}bg-light_primary_bg dark:bg-dark_primary_bg h-full w-full rounded-lg p-8`}>
            <span className='text-light_primary_text dark:text-dark_primary_text text-lg md:text-xl lg:text-2xl font-semibold'>Unpublished Courses</span>
            <ul>

                {unpublishedCourses?.map((course, i) => (
                    <div className='hover:scale-95 hover:cursor-pointer' key={course._id} onClick={() => handleClick(course)}>
                        <SingleUnpublishedCourse count={i + 1} course={course} />
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