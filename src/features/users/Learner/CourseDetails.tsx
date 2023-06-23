import React, { useEffect, useState } from 'react'
import UserSidebar from '../../../containers/Navbars/UserSidebar'
import UserNavBar from '../../../containers/Navbars/UserNavBar'
import ListLessons from '../../../containers/Sections/ListLessons'
import CourseDetailsBox from '../../../containers/Sections/learner/CourseDetailsBox'
import { useNavigate } from 'react-router-dom'
import {useAppSelector } from '../../../app/hooks/storeHooks'

const CourseDetails: React.FC = () => {
    const [sideMenu, setSideMenu] = useState(false)
    const navigate = useNavigate();
    const { isCourseFetched, publicCourse } = useAppSelector(state => state.publicCurrent)

    useEffect(() => {
        if (!isCourseFetched) {
            navigate("/learner/courses",
                {
                    replace: true
                });
        }
    }, [])

    return (
        <div className="overflow-auto">
            <UserNavBar sideMenuController={() => setSideMenu(!sideMenu)} />
            <UserSidebar sideMenu={sideMenu} />

            <div className="p-5 mt-20 md:ml-64 flex flex-col gap-5 lg:flex-row lg:gap-5" onClick={() => { setSideMenu(true) }}>
                <CourseDetailsBox classNames='w-full lg:w-[65%]' />
                <ListLessons courseId={publicCourse?.courseId} />
            </div>
        </div>
    )
}

export default CourseDetails