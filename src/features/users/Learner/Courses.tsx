import React, { useEffect, useState } from 'react'
import UserSidebar from '../../../containers/Navbars/UserSidebar'
import UserNavBar from '../../../containers/Navbars/UserNavBar'
import { useAppDispatch } from '../../../app/hooks/storeHooks'
import { fetchPublicCourses } from '../../Public/publicSlice'
import EnrolledCourses from '../../../containers/Sections/learner/EnrolledCourses'
import PublicCourseListing from '../../../containers/Sections/common/PublicCourseListing'

const Courses: React.FC = () => {
    const [sideMenu, setSideMenu] = useState(false)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchPublicCourses({}));
        setSideMenu(false)
    }, [])

    return (
        <div className="overflow-auto">
            <UserNavBar sideMenuController={() => setSideMenu(!sideMenu)} />
            <UserSidebar sideMenu={sideMenu} />
            <div className="p-5 mt-20 flex flex-col gap-5 lg:flex-row-reverse lg:gap-5" onClick={() => { setSideMenu(true) }}>
                <div className='lg:w-[40%] h-full'>
                    <EnrolledCourses />
                </div>
                <PublicCourseListing />
            </div>

        </div>
    )
}

export default Courses