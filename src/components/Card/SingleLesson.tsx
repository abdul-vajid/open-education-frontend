import React from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks/storeHooks'
import { ILessonWithoutContent } from '../../app/types/interfaces'
import UnpublishedLessonOptions from '../../containers/Dropdowns/UnpublishedLessonOptions'
import { setCurrentLesson } from '../../features/users/Tutor/currentLessonSlice'
import { useNavigate } from 'react-router-dom'
import { TutorRoutes } from '../../app/types/enums'

type SingleLessonCourseProps = {
  lesson: ILessonWithoutContent
  lessonIndex?: number
  isOptionClicked?: boolean
  optionBtnComponent?: any
  closeButton?: any
  navigationPath?: TutorRoutes
}

const SingleLesson: React.FC<SingleLessonCourseProps> = ({ lesson, lessonIndex, closeButton, isOptionClicked, optionBtnComponent, navigationPath }) => {
  const course = useAppSelector(state => state.currentCourse.course)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()


  const handleClick = () => {
    dispatch(setCurrentLesson(lesson))
    navigate(navigationPath ? navigationPath : "")
  }

  return (

      <div className='w-full p-4 mt-5 h-full cursor-pointer rounded-md bg-light_secondary_bg dark:bg-dark_secondary_bg' style={{ overflow: 'visible' }}>
        <div className='flex justify-between'>
          <div onClick={handleClick} className='flex gap-5 mr-2'>
            {
              lessonIndex && <div className='px-6 py-4 flex items-center justify-center rounded-md bg-light_primary_bg dark:bg-dark_primary_bg'>
                <span className='text-light_primary_text dark:text-dark_primary_text text-lg md:text-xl'>{lessonIndex}</span>
              </div>
            }
            <div className='flex flex-col gap-2'>
              <span className='text-md font font-semibold text-light_primary_text dark:text-dark_primary_text'>{lesson.lessonTitle}</span>
              <span className='text-xs hidden md:block text-light_secondary_text dark:text-dark_secondary_text'>{lesson?.lessonDescription?.slice(0, 75)}...</span>
            </div>
          </div>
          <div className='text-light_primary dark:text-dark_primary flex justify-center items-center mr-3'>
            {!isOptionClicked ? optionBtnComponent : closeButton}
          </div>
        </div>
        {isOptionClicked && (
          <div className='relative z-20 h-[10px] flex justify-end mt-[-10px]'>
            <UnpublishedLessonOptions course={course} />
          </div>
        )}
      </div>

  )
}

export default SingleLesson
