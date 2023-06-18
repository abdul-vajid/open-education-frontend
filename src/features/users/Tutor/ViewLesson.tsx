import React, { useState } from 'react'
import UserSidebar from '../../../containers/Navbars/UserSidebar'
import UserNavBar from '../../../containers/Navbars/UserNavBar'

const ViewLesson: React.FC = () => {
    const [sideMenu, setSideMenu] = useState(false)
   
    return (
        <div className="overflow-auto">
            <UserNavBar sideMenuController={() => setSideMenu(!sideMenu)} />
            <UserSidebar sideMenu={sideMenu} />
        </div>
    )
}

export default ViewLesson