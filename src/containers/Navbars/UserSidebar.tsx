import React from 'react'
import SideBarBtn from '../../components/Button/SideBarBtn';

type UserSidebarProps = {
    sideMenu: boolean
};


const UserSidebar: React.FC<UserSidebarProps> = ({ sideMenu }) => {
    return (
        <aside id="logo-sidebar" className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${sideMenu ? "-translate-x-full" : ""} bg-white border-r border-gray-200 md:translate-x-0 dark:bg-gray-800 dark:border-gray-700`} aria-label="Sidebar">
            <div className="h-full px-3 pt-4 overflow-y-auto bg-white dark:bg-gray-800">
                <span className='font-medium text-lg text-light_primary dark:text-dark_primary_text'>Menu</span>
                <ul className="space-y-2 font-medium my-5">
                    <SideBarBtn BtnText='Over view' isSelected={true} linkPath='/tutor'  />
                    <SideBarBtn BtnText='Courses' isSelected={false} linkPath='/tutor/courses'  />
                    <SideBarBtn BtnText='Mentors' isSelected={false} linkPath='/'  />
                </ul>
                <span className='font-medium text-lg text-light_primary dark:text-dark_primary_text'>Account</span>
                <ul className="space-y-2 font-medium">
                    <SideBarBtn BtnText='Inbox' isSelected={false} linkPath='/' isBadge={true} />
                    <SideBarBtn BtnText='Notifications' isSelected={false} linkPath='/'  />
                    <SideBarBtn BtnText='Profile' isSelected={false} linkPath='/'  />
                    <SideBarBtn BtnText='Contact Us' isSelected={false} linkPath='/'  />
                </ul>
            </div>
        </aside>
    )
}

export default UserSidebar