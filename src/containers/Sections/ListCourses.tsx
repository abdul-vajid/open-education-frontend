import React from 'react'
import SingleCourse from '../../components/Card/SingleCourse'
import ListEmpty from '../../components/ErrorCards/ListEmpty'
import LoaderCard from '../../components/Card/LoaderCard'
import { useAppSelector } from '../../app/hooks/storeHooks'
type ListCoursesProps = {
    classNames?: string
    title?: string
}

const ListCourses: React.FC<ListCoursesProps> = ({ classNames, title}) => {
    const { publishedCourses } = useAppSelector(state => state.tutorCourses.courses)
    const {coursesFetching, coursesFeteched} = useAppSelector(state => state.tutorCourses)

    return (
        <div className={`${classNames}bg-light_primary_bg dark:bg-dark_primary_bg h-full w-full lg:w-[60%] rounded-lg p-8`}>
            <span className='text-light_primary_text dark:text-dark_primary_text text-lg md:text-xl lg:text-2xl font-semibold'>{!title ? "Courses" : title}</span>
            <ul>
                { (coursesFeteched === true && Array.isArray(publishedCourses)) ? publishedCourses.map((course) => (
                    <div>
                        {
                            course.courseTitle !== "" && <SingleCourse  course={course}/>
                    }
                    </div> 

                )) : coursesFetching ? <LoaderCard/> : <ListEmpty message='Courses not found'/> }
            </ul>
        </div>
    )
}

export default ListCourses