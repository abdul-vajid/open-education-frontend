import React, { useState } from 'react'
import UserSidebar from '../../../containers/Navbars/UserSidebar'
import UserNavBar from '../../../containers/Navbars/UserNavBar'
import ListLessons from '../../../containers/Sections/ListLessons'
import CourseDetailsBox from '../../../containers/Sections/CourseDetailsBox'
import FloatingActionBtn from '../../../components/Button/FloatingActionBtn'
import { Link, useParams } from 'react-router-dom'
import { useAppSelector } from '../../../app/hooks/storeHooks'
import { TCourse } from '../../../app/types/types'
import { CourseStatus } from '../../../app/types/enums'

const CourseDetails: React.FC = () => {
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
            break;
        case CourseStatus.Published:
            const { publishedCourses } = useAppSelector(state => state.tutorCourses.courses)
            course = findCourseById(publishedCourses)
            break;
        case CourseStatus.Unlisted:
            const { unlistedCourses } = useAppSelector(state => state.tutorCourses.courses)
            course = findCourseById(unlistedCourses)
            break;
    }



    return (
        <>
            <UserNavBar sideMenuController={() => setSideMenu(!sideMenu)} />
            <UserSidebar sideMenu={sideMenu} />

            <div className="p-5 mt-20 md:ml-64 flex flex-col gap-5 lg:flex-row lg:gap-5" onClick={() => { setSideMenu(true) }}>
                <CourseDetailsBox classNames='w-full lg:w-[65%]' course={course} />
                <ListLessons />
            </div>
            <Link to={'/tutor/course/create-lesson'}>
                <FloatingActionBtn btnText='Create Lesson' />
            </Link>
        </>
    )
}

export default CourseDetails