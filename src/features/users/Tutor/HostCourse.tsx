import { useState, useEffect } from "react"
import UserNavBar from "../../../containers/Navbars/UserNavBar"
import UserSidebar from "../../../containers/Navbars/UserSidebar"
import { useAppSelector } from "../../../app/hooks/storeHooks"
import { useNavigate } from "react-router-dom"
import HostingSection from "../../../containers/Sections/HostingSection"


const HostCourse: React.FC = () => {
    const [sideMenu, setSideMenu] = useState(false)
    const { courseDetailsAvailable } = useAppSelector(state => state.currentCourse)
    const navigate = useNavigate()

    useEffect(() => {
        if (!courseDetailsAvailable) {
            navigate("/tutor/courses",
                {
                    replace: true
                });
        }
    })

    return (
        <div className="overflow-auto">
            <UserNavBar sideMenuController={() => setSideMenu(!sideMenu)} />
            <UserSidebar sideMenu={sideMenu} />
            <div className="p-5 mt-20 md:ml-64 flex  flex-col xl:flex-row gap-5 lg:gap-5" onClick={() => { setSideMenu(true) }}>
                <div className='h-full w-full'>
                    <HostingSection />
                </div>

            </div>
        </div>
    )
}

export default HostCourse