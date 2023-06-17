import React, { useState } from 'react'
import UserSidebar from '../../../containers/Navbars/UserSidebar'
import UserNavBar from '../../../containers/Navbars/UserNavBar'

const ViewLesson: React.FC = () => {
    const [sideMenu, setSideMenu] = useState(false)
   
    return (
        <>
            <UserNavBar sideMenuController={() => setSideMenu(!sideMenu)} />
            <UserSidebar sideMenu={sideMenu} />
        </>
    )
}

export default ViewLesson