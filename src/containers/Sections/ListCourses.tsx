import React from 'react'
import SingleCourse from '../../components/Card/SingleCourse'
import { TCourse, TPublishedCourse } from '../../app/types/types'
import ListEmpty from '../../components/ErrorCards/ListEmpty'
import LoaderCard from '../../components/Card/LoaderCard'
type ListCoursesProps = {
    classNames?: string
    title?: string
    courses: TCourse []
    isCourses: boolean
    isFetchingCourses: boolean
}

const ListCourses: React.FC<ListCoursesProps> = ({ classNames, courses, title, isCourses, isFetchingCourses}) => {

    return (
        <div className={`${classNames}bg-light_primary_bg dark:bg-dark_primary_bg h-full w-full lg:w-[60%] rounded-lg p-8`}>
            <span className='text-light_primary_text dark:text-dark_primary_text text-lg md:text-xl lg:text-2xl font-semibold'>{!title ? "Courses" : title}</span>
            <ul>
                { (isCourses === true && Array.isArray(courses)) ? courses.map((course) => (
                    <div>
                        {
                            course.courseTitle !== "" && <SingleCourse  course={course}/>
                    }
                    </div> 

                )) : isFetchingCourses ? <LoaderCard/> : <ListEmpty message='Courses not found'/> }
            </ul>
        </div>
    )
}

export default ListCourses