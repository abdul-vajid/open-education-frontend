import React, { useEffect } from 'react'
import SingleCourse from '../../../components/Card/SingleCourse'
import SearchField from '../../../components/InputFiled/SearchField'
import { useAppDispatch, useAppSelector } from '../../../app/hooks/storeHooks'
import { fetchPublicCourses } from '../../../features/Public/publicSlice'
import LoaderCard from '../../../components/Card/LoaderCard'
import ListEmpty from '../../../components/ErrorCards/ListEmpty'
import { LearnerRoutes } from '../../../app/types/enums'
import { fetchPublicCourse } from '../../../features/Public/publicCurrentSlice'
import { useErrorToast } from '../../../app/hooks/toastHooks'
import { useNavigate } from 'react-router-dom'

const PublicCourseListing: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate()
    const { publicCourses, isFetchingCourses, fetchingCoursesErrMsg, isCoursesFetched } = useAppSelector(state => state.public)

    const handleCourseClick = (courseId: string) => {
        dispatch(fetchPublicCourse(courseId)).then((action)=> {
            console.log("action from dispatch",action)
            navigate(LearnerRoutes.courseDetails)
        }).catch(()=> {
            useErrorToast({message: "Can not fetch course!"})
        })
    }

    useEffect(() => {
        dispatch(fetchPublicCourses())
    }, [])


    return (
        <div>
            <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                <div className="flex flex-col md:flex-row gap-5 items-start md:items-center justify-between my-5">
                    <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Popular Courses</h5>
                    <SearchField />
                    <a href="#" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
                        View all
                    </a>
                </div>
                <div>
                    <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                        {
                            fetchingCoursesErrMsg &&
                            <li className='py-3 sm:py-4"'>
                                <span className='text-red-500 text-lg text content-center'></span>
                            </li>
                        }
                        {(isCoursesFetched === true && Array.isArray(publicCourses)) ? publicCourses.map((course) => (
                            <div>
                                {
                                    course.courseTitle !== "" && <SingleCourse onClick={() => handleCourseClick(course.courseId)} course={course} />
                                }
                            </div>

                        )) : isFetchingCourses ? <LoaderCard /> : <ListEmpty message='Courses not found' />}

                    </ul>
                </div>
                <div className='flex justify-between align-baseline mt-7'>
                    <a href="#" className="inline-flex items-center px-4 py-2 mr-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                        <svg aria-hidden="true" className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd"></path></svg>
                        Previous
                    </a>
                    <a href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                        Next
                        <svg aria-hidden="true" className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    </a>

                </div>
            </div>
        </div>
    )
}

export default PublicCourseListing