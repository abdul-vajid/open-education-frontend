import React, { useEffect, useState } from 'react'
import UserSidebar from '../../../containers/Navbars/UserSidebar'
import UserNavBar from '../../../containers/Navbars/UserNavBar'
import ListCourses from '../../../containers/Sections/learner/ListCourses'
import { useAppDispatch, useAppSelector } from '../../../app/hooks/storeHooks'
import { fetchPublicCourses } from '../../Public/publicSlice'
import EnrolledCourses from '../../../containers/Sections/EnrolledCourses'

const Courses: React.FC = () => {
    const [sideMenu, setSideMenu] = useState(false)
    const { publicCourses, isCoursesFetched,  isFetchingCourses} = useAppSelector(state => state.public)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchPublicCourses());
    }, [])

    return (
        <div className="overflow-auto">
            <UserNavBar sideMenuController={() => setSideMenu(!sideMenu)} />
            <UserSidebar sideMenu={sideMenu} />
            <div className="p-5 mt-20 md:ml-64 flex flex-col gap-5 lg:flex-row-reverse lg:gap-5" onClick={() => { setSideMenu(true) }}>
                <div className='lg:w-[40%] h-full'>
                    <EnrolledCourses />
                </div>
                <ListCourses courses={publicCourses} isCourses={!isCoursesFetched ? false : true} isFetchingCourses={!isFetchingCourses ? false : true} classNames='lg:w-[70%]'/>
            </div>

        </div>
    )
}

export default Courses