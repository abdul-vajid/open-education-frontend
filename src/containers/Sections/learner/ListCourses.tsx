import React from 'react'
import SingleCourse from '../../../components/Card/SingleCourse'
import { TCourse, TPublishedCourse } from '../../../app/types/types'
import ListEmpty from '../../../components/ErrorCards/ListEmpty'
import LoaderCard from '../../../components/Card/LoaderCard'
import { useAppDispatch } from '../../../app/hooks/storeHooks'
import { fetchPublicCourse } from '../../../features/Public/publicCurrentSlice'
import { useNavigate } from 'react-router-dom'
import { LearnerRoutes } from '../../../app/types/enums'

type ListCoursesProps = {
    classNames?: string
    title?: string
    courses: TPublishedCourse[] | TCourse
    isCourses: boolean
    isFetchingCourses: boolean
}

const ListCourses: React.FC<ListCoursesProps> = ({ classNames, courses, title, isCourses, isFetchingCourses}) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const handleSingleCourseClick = (courseId: string)=> {
        dispatch(fetchPublicCourse(courseId)).then((respone)=> {
            navigate(LearnerRoutes.courseDetails)
        })
    }

    return (
        <div className={`${classNames}bg-light_primary_bg dark:bg-dark_primary_bg h-full w-full lg:w-[60%] rounded-lg p-8`}>
            <span className='text-light_primary_text dark:text-dark_primary_text text-lg md:text-xl lg:text-2xl font-semibold'>{!title ? "Courses" : title}</span>
            <ul>
                { (isCourses === true && Array.isArray(courses)) ? courses.map((course) => (
                    <div>
                        {
                            course.courseTitle !== "" && <SingleCourse onClick={()=> handleSingleCourseClick(course.courseId)} course={course}/>
                    }
                    </div> 

                )) : isFetchingCourses ? <LoaderCard/> : <ListEmpty message='Courses not found'/> }
            </ul>
        </div>
    )
}

export default ListCourses