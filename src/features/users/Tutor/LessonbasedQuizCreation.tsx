import { useState, useEffect } from "react"
import UserNavBar from "../../../containers/Navbars/UserNavBar"
import UserSidebar from "../../../containers/Navbars/UserSidebar"
import CreateQuiz from "../../../containers/Sections/CreateQuiz"
import { useAppSelector } from "../../../app/hooks/storeHooks"
import { TutorRoutes } from "../../../app/types/enums"
import { useNavigate } from "react-router-dom"
import SingleLesson from "../../../components/Card/SingleLesson"


const LessonbasedQuizCreation: React.FC = () => {
    const [sideMenu, setSideMenu] = useState(false)
    const { courseDetailsAvailable } = useAppSelector(state => state.currentCourse)
    const { curentLessonAvailable, curentLesson } = useAppSelector(state => state.currentLesson)
    const navigate = useNavigate()

    useEffect(() => {
        if (!courseDetailsAvailable) {
            navigate(TutorRoutes.courses,
                {
                    replace: true
                });
        } else if (!curentLessonAvailable) {
            navigate(TutorRoutes.setupValuation,
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
                    <div>
                        <div className="p-5 bg-light_primary_bg dark:bg-dark_primary_bg mb-5 rounded-lg">
                        <span className='text-light_primary_text dark:text-dark_primary_text text-lg md:text-xl lg:text-2xl font-semibold'>Lesson based quiz for</span>
                            <SingleLesson lesson={curentLesson} />
                        </div>
                        <CreateQuiz />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default LessonbasedQuizCreation