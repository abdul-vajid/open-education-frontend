import React, { useState } from 'react'
import UserSidebar from '../../../containers/Navbars/UserSidebar'
import UserNavBar from '../../../containers/Navbars/UserNavBar'
import ListLessons from '../../../containers/Sections/ListLessons'
import CourseDetailsBox from '../../../containers/Sections/CourseDetailsBox'
import FloatingActionBtn from '../../../components/Button/FloatingActionBtn'
import { Link } from 'react-router-dom'

const CourseDetails: React.FC = () => {
    const [sideMenu, setSideMenu] = useState(false)
    // const { email, fullname } = useAppSelector(state => state.user)

    return (
        <>
            <UserNavBar sideMenuController={() => setSideMenu(!sideMenu)} />
            <UserSidebar sideMenu={sideMenu} />

            <div className="p-5 mt-20 md:ml-64 flex flex-col gap-5 lg:flex-row lg:gap-5" onClick={() => { setSideMenu(true) }}>
                <CourseDetailsBox classNames='w-full lg:w-[65%]' />
                <ListLessons />
            </div>
            <Link to={'/tutor/course/create-lesson'}>
                <FloatingActionBtn btnText='Create Lesson' />
            </Link>
        </>
    )
}

export default CourseDetails