import React from 'react'
import SingleUnpublishedCourse from '../../components/Card/SingleUnpublished'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks/storeHooks'
import LoaderCard from '../../components/Card/LoaderCard'
import { TCourse } from '../../app/types/types'

type NonPublishedCoursesProps = {
    classNames?: string
}

const NonPublishedCourses: React.FC<NonPublishedCoursesProps> = ({ classNames }) => {
    const { loading } = useAppSelector(state => state.tutorCourses)
    const unpublishedCourses: TCourse[] = useAppSelector(state => state.tutorCourses.courses.unpublishedCourses)
    return (
        <div className={`${classNames}bg-light_primary_bg dark:bg-dark_primary_bg h-full w-full rounded-lg p-8`}>
            <span className='text-light_primary_text dark:text-dark_primary_text text-lg md:text-xl lg:text-2xl font-semibold'>Unpublished Courses</span>
            <ul>
                {unpublishedCourses?.map((course, i) => (
                    <Link to={`/tutor/course/details/${course.status}/${course._id}/`} key={course._id}>
                        <SingleUnpublishedCourse count={i + 1} course={course} />
                    </Link>
                ))}
                {
                    loading && <LoaderCard />
                }
            </ul>
        </div>
    )
}

export default NonPublishedCourses