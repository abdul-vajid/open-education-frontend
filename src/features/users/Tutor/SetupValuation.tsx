import { useState, useEffect } from "react"
import UserNavBar from "../../../containers/Navbars/UserNavBar"
import UserSidebar from "../../../containers/Navbars/UserSidebar"
import CreateQuiz from "../../../containers/Sections/CreateQuiz"
import ChooseValuation from "../../../components/Card/ChooseValuation"
import ListLessons from "../../../containers/Sections/ListLessons"
import { useAppSelector } from "../../../app/hooks/storeHooks"
import { TutorRoutes, ValuationModes } from "../../../app/types/enums"
import { useNavigate } from "react-router-dom"


const SetupValuation: React.FC = () => {
    const [sideMenu, setSideMenu] = useState(false)
    const { course, courseDetailsAvailable } = useAppSelector(state => state.currentCourse)
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
                <div className='h-full flex flex-col lg:flex-row-reverse gap-5'>
                    <ChooseValuation />
                    {
                        course.valuationMode === ValuationModes.LessonBasedMcq ? <ListLessons navigationPath={TutorRoutes.createLessonbasedQuiz} courseId={course?._id} />
                            : <div>
                                <CreateQuiz />
                            </div>
                    }
                </div>

            </div>
        </div>
    )
}

export default SetupValuation