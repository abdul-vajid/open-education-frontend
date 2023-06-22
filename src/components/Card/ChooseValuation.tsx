import React, { useState } from 'react'
import PrimaryBtn from '../../components/Button/PrimaryBtn'
import SelectorButton from '../Button/SelectorButton'
import useAxiosPrivate from '../../app/hooks/useAxiosPrivate'
import { useErrorToast, useSuccessToast } from '../../app/hooks/toastHooks'
import { useAppDispatch, useAppSelector } from '../../app/hooks/storeHooks'
import { ValuationModes } from '../../app/types/enums'
import DefaultModal from '../Modal/DefaultModal'
import { setValuationMode } from '../../features/users/Tutor/currentCourseSlice'

type ChooseValuationProps = {
    classNames?: string
}
type RequestOptions = {
    valuationMode: string | undefined
    courseId: string,
    confirmToken?: string
}

const ChooseValuation: React.FC<ChooseValuationProps> = ({ classNames }) => {
    const [modalParagraph, setModalParagraph] = useState<string>("")
    const [confirmToken, setConfirmToken] = useState<string>("")
    const [isLoading, setLoading] = useState<boolean>(false)
    const [isModalOpen, setModalOpen] = useState<boolean>(false)
    const { course } = useAppSelector(state => state.currentCourse)
    const [newValuationMode, setNewValuationMode] = useState(course.valuationMode)
    const axios = useAxiosPrivate()
    const dispatch = useAppDispatch()

    const updateValuationMode = (requestOptions: RequestOptions) => {
        setLoading(true)
        axios.put("/course/update-valuation-mode", requestOptions).then((response) => {
            if (response.data.success) {
                if (response.data.data.confirmToken) {
                    setModalParagraph(response.data.message)
                    setConfirmToken(response.data.data.confirmToken)
                    setModalOpen(true)
                } else {
                    setModalOpen(false)
                    dispatch(setValuationMode(response.data.data.valuationMode))
                    useSuccessToast({ message: response.data.message })
                }
            } else useErrorToast({ message: response.data.message });
        }).catch((error) => {
            useErrorToast({ message: error.response.data.message });
        }).finally(() => {
            setLoading(false)
        })
    }
    return (
        <div className={`${classNames}bg-light_primary_bg dark:bg-dark_primary_bg h-full rounded-lg p-8`}>
            {isModalOpen && <DefaultModal
                heading='Are you sure with this action?'
                closeClick={() => setModalOpen(false)}
                paragraph={modalParagraph}
                rightButtonClick={() => setModalOpen(false)}
                rightButtonText='Decline'
                leftButtonText='Agree'
                leftButtonClick={() => updateValuationMode({ courseId: course._id, valuationMode: newValuationMode, confirmToken })}
            />}
            <div className='flex flex-col gap-3 mb-8'>
                <span className='text-light_primary_text dark:text-dark_primary_text text-lg md:text-xl lg:text-2xl font-semibold'>{course.valuationMode ? "Course Valuation" : "Choose Valuation"}</span>
                <span className='text-xs text-light_secondary_text dark:text-dark_secondary_text'>We highly recommend opting for lesson-based valuation, as it is a widely preferred approach in open education. By choosing this method, you significantly enhance your chances of enrollment.</span>
            </div>
            <div className="flex justify-between w-full gap-5">
                <div className="flex-1" onClick={() => setNewValuationMode(ValuationModes.LessonBasedMcq)}>
                    <SelectorButton id='lesson-based-mcq' position='center' title='Lesson-based mcq' description='High Popularity' isChecked={newValuationMode == ValuationModes.LessonBasedMcq ? true : false} />
                </div>
                <div className="flex-1" onClick={() => setNewValuationMode(ValuationModes.CourseBasedMcq)}>
                    <SelectorButton id='course-based-mcq' position='center' title='Course-based mcq' description='Less Popularity' isChecked={newValuationMode == ValuationModes.CourseBasedMcq ? true : false} />
                </div>
            </div>
            <div className='flex justify-end mt-10 mb-5'>
                <PrimaryBtn onClick={() => updateValuationMode({ courseId: course._id, valuationMode: newValuationMode })} btnText='Save Changes' isLoading={!isLoading ? false : true} loadingText='Updating..' />
            </div>
        </div>
    )
}

export default ChooseValuation 