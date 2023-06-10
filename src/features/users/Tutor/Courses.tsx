import React, { useState } from 'react'
import UserSidebar from '../../../containers/Navbars/UserSidebar'
import UserNavBar from '../../../containers/Navbars/UserNavBar'
import ListCourses from '../../../containers/Sections/ListCourses'
import FloatingActionBtn from '../../../components/Button/FloatingActionBtn'
import CreateCourse from '../../../containers/Forms/CreateCourse'
import NonPublishedCourses from '../../../containers/Sections/NonPublishedCourses'

const Courses: React.FC = () => {
    const [sideMenu, setSideMenu] = useState(false)
    const [createCourseVisibility, setCreateCourseVisibility] = useState(false)
    // const { email, fullname } = useAppSelector(state => state.user)

    return (
        <>
            <UserNavBar sideMenuController={() => setSideMenu(!sideMenu)} />
            <UserSidebar sideMenu={sideMenu} />

            <div className="p-5 mt-20 md:ml-64 flex flex-col gap-5 lg:flex-row-reverse lg:gap-5" onClick={() => { setSideMenu(true) }}>
                <div className='lg:w-[40%] h-full'>
                    {
                        createCourseVisibility && <CreateCourse />
                    }
                    <NonPublishedCourses/>
                </div>
                <ListCourses classNames='lg:w-[70%]' />
            </div>
            
            {
                !createCourseVisibility && <FloatingActionBtn btnText='Create Course' onClick={()=>setCreateCourseVisibility(true)} />
            }
        
        </>
    )
}

export default Courses