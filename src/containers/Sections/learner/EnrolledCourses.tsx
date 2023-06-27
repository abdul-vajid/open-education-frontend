import React from 'react'
import ListEmpty from '../../../components/ErrorCards/ListEmpty'

type EnrolledCoursesProps = {
    classNames?: string
}

const EnrolledCourses: React.FC<EnrolledCoursesProps> = ({ classNames }) => {


    return (
        <div className={`${classNames}bg-light_primary_bg dark:bg-dark_primary_bg h-full w-full rounded-lg p-8`}>
            <span className='text-light_primary_text dark:text-dark_primary_text text-lg md:text-xl lg:text-2xl font-semibold'>Enrolled Courses</span>
            <ul>
            <ListEmpty message='You have not enrolled in any courses yet.'/>
            </ul>
        </div>
    )
}

export default EnrolledCourses