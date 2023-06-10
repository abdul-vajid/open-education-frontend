import React from 'react'
import SingleUnpublishedCourse from '../../components/Card/SingleUnpublished'
import { Link } from 'react-router-dom'

type NonPublishedCoursesProps = {
    classNames?: string
}

const NonPublishedCourses: React.FC<NonPublishedCoursesProps> = ({ classNames }) => {
    return (
        <div className={`${classNames}bg-light_primary_bg dark:bg-dark_primary_bg h-full w-full rounded-lg p-8`}>
            <span className='text-light_primary_text dark:text-dark_primary_text text-lg md:text-xl lg:text-2xl font-semibold'>Unpublished Courses</span>
            <ul>
                {[10, 20, 30, 40].map((_x, i) => (
                    <Link to={'/tutor/course/details'}>
                        <SingleUnpublishedCourse count={i + 1} />
                    </Link>
                ))}
            </ul>
        </div>
    )
}

export default NonPublishedCourses