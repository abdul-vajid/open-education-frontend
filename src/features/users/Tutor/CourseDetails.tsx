import React, { useEffect, useState } from 'react'
import UserSidebar from '../../../containers/Navbars/UserSidebar'
import UserNavBar from '../../../containers/Navbars/UserNavBar'
import ListLessons from '../../../containers/Sections/ListLessons'
import CourseDetailsBox from '../../../containers/Sections/CourseDetailsBox'
import FloatingActionBtn from '../../../components/Button/FloatingActionBtn'
import { Link, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../app/hooks/storeHooks'
import { TCourse } from '../../../app/types/types'
import { CourseStatus } from '../../../app/types/enums'
import useAxiosPrivate from '../../../app/hooks/useAxiosPrivate'
import { fetchCourse } from './tutorCoursesSlice'
import { setCurrentCourse } from './currentCourseSlice'

const CourseDetails: React.FC = () => {
    const axiosInstance = useAxiosPrivate();
    const dispatch = useAppDispatch()
    const [sideMenu, setSideMenu] = useState(false)
    const { id, status } = useParams()

    let course: TCourse | undefined
    const findCourseById = (courses: TCourse[]): TCourse | undefined => {
        return courses.find((course) => course._id === id);
    };


    switch (status) {
        case CourseStatus.Draft:
            const { unpublishedCourses } = useAppSelector(state => state.tutorCourses.courses)
            course = findCourseById(unpublishedCourses)
            console.log("course from courseDetails",course)
            if (course) {
                dispatch(setCurrentCourse(course))
            }
            break;
        case CourseStatus.Published:
            const { publishedCourses } = useAppSelector(state => state.tutorCourses.courses)
            course = findCourseById(publishedCourses)
            if (course) {
                dispatch(setCurrentCourse(course))
            }
            break;
        case CourseStatus.Unlisted:
            const { unlistedCourses } = useAppSelector(state => state.tutorCourses.courses)
            course = findCourseById(unlistedCourses)
            if (course) {
                dispatch(setCurrentCourse(course))
            }
            break;
    }

    useEffect(() => {
        if (course?._id) {
            console.log("fetchCourse trigger>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
            dispatch(fetchCourse({ courseId: course._id, axiosInstance }));
        }
    }, [])

    return (
        <>
            <UserNavBar sideMenuController={() => setSideMenu(!sideMenu)} />
            <UserSidebar sideMenu={sideMenu} />

            <div className="p-5 mt-20 md:ml-64 flex flex-col gap-5 lg:flex-row lg:gap-5" onClick={() => { setSideMenu(true) }}>
                <CourseDetailsBox classNames='w-full lg:w-[65%]' course={course} />
                <ListLessons courseId={course?._id} />
            </div>
            <Link to={`/tutor/course/${course?._id}/create-lesson`}>
                <FloatingActionBtn btnText='Create Lesson' />
            </Link>
        </>
    )
}

export default CourseDetails