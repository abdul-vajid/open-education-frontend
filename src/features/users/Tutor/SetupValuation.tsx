import { useState } from "react"
import UserNavBar from "../../../containers/Navbars/UserNavBar"
import UserSidebar from "../../../containers/Navbars/UserSidebar"
import CreateQuiz from "../../../containers/Sections/CreateQuiz"
import ChooseValuation from "../../../components/Card/ChooseValuation"
import ListLessons from "../../../containers/Sections/ListLessons"
import { useAppSelector } from "../../../app/hooks/storeHooks"


const SetupValuation: React.FC = () => {
    const [sideMenu, setSideMenu] = useState(false)
    const course = useAppSelector(state => state.currentCourse.course)
    return (
        <div className="overflow-auto">
            <UserNavBar sideMenuController={() => setSideMenu(!sideMenu)} />
            <UserSidebar sideMenu={sideMenu} />
            <div className="p-5 mt-20 md:ml-64 flex  flex-col xl:flex-row gap-5 lg:gap-5" onClick={() => { setSideMenu(true) }}>
                <div className="xl:hidden">
                    <ChooseValuation />
                </div>
                <div className='lg:w-[85%] h-full xl:flex flex-col gap-5 hidden'>
                    <ChooseValuation />
                    <CreateQuiz />
                </div>
                <ListLessons courseId={course?._id} />
            </div>
        </div>
    )
}

export default SetupValuation