import React from 'react'
import SingleCourse from '../../components/Card/SingleCourse'

type ListCoursesProps = {
    classNames?: string
}

const ListCourses: React.FC<ListCoursesProps> = ({classNames}) => {
    return (
        <div className={`${classNames}bg-light_primary_bg dark:bg-dark_primary_bg h-full w-full lg:w-[60%] rounded-lg p-8`}>
            <span className='text-light_primary_text dark:text-dark_primary_text text-lg md:text-xl lg:text-2xl font-semibold'>My Courses</span>
            <ul>
                {[10, 20, 30, 40, 50, 60, 70].map(() => (
                    <SingleCourse />
                ))}
            </ul>
        </div>
    )
}

export default ListCourses