import { useState } from "react"
import UserNavBar from "../../../containers/Navbars/UserNavBar"
import UserSidebar from "../../../containers/Navbars/UserSidebar"


const Inbox: React.FC = () => {
    const [sideMenu, setSideMenu] = useState(false)

    return (
        <>
            <UserNavBar sideMenuController={() => setSideMenu(!sideMenu)} />
            <UserSidebar sideMenu={sideMenu} />
            <div className="p-5 mt-20 md:ml-64 flex flex-col gap-5 lg:gap-5" onClick={() => { setSideMenu(true) }}>
                <div className='lg:w-[65%] h-full'>
                    <h1 className="text-white text-3xl">This is inbox</h1>
                </div>
            </div>


        </>
    )
}

export default Inbox