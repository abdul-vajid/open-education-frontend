import React, { useEffect, useState } from 'react'
import InputField from '../../../components/InputFiled/InputField'
import TextArea from '../../../components/InputFiled/TextArea'
import { useFormik } from 'formik'
import PrimaryBtn from '../../../components/Button/PrimaryBtn'
import OutlineBtn from '../../../components/Button/OutlineBtn'
import { useAppDispatch, useAppSelector } from '../../../app/hooks/storeHooks'
import { TutorRoutes, ValuationModes } from '../../../app/types/enums'
import useAxiosPrivate from '../../../app/hooks/useAxiosPrivate'
import { addQuestion, createQuiz, fetchQuiz } from '../../../features/users/Tutor/setUpValuationSlice'
import { questionSchema } from '../../../utils/validations/questionSchema'
import { IQuestion } from '../../../app/types/interfaces'
import { useErrorToast, useSuccessToast } from '../../../app/hooks/toastHooks'
import { Link } from 'react-router-dom'

type CreateQuizProps = {
    classNames?: string
}

const CreateQuiz: React.FC<CreateQuizProps> = ({ classNames }) => {
    const { course } = useAppSelector(state => state.currentCourse)
    const { curentLesson } = useAppSelector(state => state.currentLesson)
    const { isQuizAvailable, quiz, creatingQuizErrorMsg, isLoading, addQuestionErrorMsg } = useAppSelector(state => state.setUpValuation)
    const [questionsArray, setQuestionsArray] = useState<IQuestion[]>([])
    const [fetchQuizAgain, setFetchQuizAgain] = useState<boolean>(false)
    const dispatch = useAppDispatch()
    const axios = useAxiosPrivate()

    const formik = useFormik({
        initialValues: {
            question: "",
            correctAnswer: "",
            optionA: "",
            optionB: "",
            optionC: ""
        },

        validationSchema: questionSchema,

        onSubmit: (values) => {
            if (!isQuizAvailable) {
                questionsArray.push(values)
                setQuestionsArray(questionsArray)
                formik.resetForm()
            } else {
                dispatch(addQuestion({
                    axiosInstance: axios,
                    body: {
                        courseId: course._id,
                        quizId: quiz._id,
                        question: values.question,
                        correctAnswer: values.correctAnswer,
                        optionA: values.optionA,
                        optionB: values.optionB,
                        optionC: values.optionC
                    }
                })).then((action) => {
                    setFetchQuizAgain(true)
                    useSuccessToast({ message: action.payload.message || 'Greate! Question added' })
                    formik.resetForm()
                }).catch(() => {
                    useErrorToast({
                        message: addQuestionErrorMsg ? addQuestionErrorMsg : "Something went wrong, Try again!",
                    });
                })
            }
        },
    });

    const handleCreateQuiz = () => {
        if (questionsArray.length <= 0) {
            useErrorToast({ message: "Please add at least one question to create the quiz" })
            return
        }
        dispatch(createQuiz({
            axiosInstance: axios,
            body: {
                courseId: course._id,
                lessonId: course.valuationMode === ValuationModes.LessonBasedMcq ? curentLesson.lessonId : undefined,
                valuationMode: course.valuationMode,
                questions: questionsArray
            }
        })).then((action) => {
            setFetchQuizAgain(true)
            const response = action.payload;
            if (response.status === "fulfilled") {
                useSuccessToast({ message: response.message || 'Greate! Quiz created' })
            }
        }).catch(() => {
            useErrorToast({
                message: creatingQuizErrorMsg ? creatingQuizErrorMsg : "Something went wrong, Try again!",
            });
        })
    }

    useEffect(() => {
        if (course.valuationMode === ValuationModes.CourseBasedMcq) {
            dispatch(fetchQuiz({
                axiosInstance: axios,
                courseId: course._id,
                lessonId: undefined
            }))
        } else {
            dispatch(fetchQuiz({
                axiosInstance: axios,
                courseId: course._id,
                lessonId: curentLesson.lessonId
            }))
        }
    }, [fetchQuizAgain])

    return (
        <div className={`${classNames}bg-light_primary_bg dark:bg-dark_primary_bg h-auto rounded-lg p-8`}>
            {
                isQuizAvailable ? <div>
                    <div className='flex flex-col gap-3 mb-8 rounded-xl'>
                        <span className='text-light_primary_text dark:text-dark_primary_text text-lg md:text-xl lg:text-2xl font-semibold'>Already have a quiz</span>
                        <span className='text-xs text-light_secondary_text dark:text-dark_secondary_text'>{`This ${course.valuationMode === ValuationModes.LessonBasedMcq ? "Lesson" : "Course"} have ${quiz.questions.length} questions, You can manage them and also add new questions to this quiz`}</span>
                    </div>
                </div>
                    : <div className='flex flex-col gap-3 mb-8 rounded-xl'>
                        <span className='text-light_primary_text dark:text-dark_primary_text text-lg md:text-xl lg:text-2xl font-semibold'>Create Quiz</span>
                        <span className='text-xs text-light_secondary_text dark:text-dark_secondary_text'>No worries! Our bot will shuffle the options, so the order doesn't matter. Please proceed with creating the quiz confidently. </span>
                    </div>
            }
            {
                questionsArray.length > 0 && <span className='text-xs text-yellow-400'>{`You've ${questionsArray.length} unsaved question, don't forgot save them before leave`}</span>
            }

            <TextArea
                labelText='Question 1'
                name='question'
                placeHolder='eg:  Which runtime environment allows developers to execute JavaScript code outside of a web browser?'
                messageType="error"
                value={formik.values.question}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isMessage={formik.touched.question}
                message={formik.errors.question}
            />
            <div className="flex flex-col w-full gap-1">
                <InputField
                    inputType="text"
                    labelText="Correct Answer"
                    name="correctAnswer"
                    placeHolder='eg: Node.js'
                    messageType="error"
                    value={formik.values.correctAnswer}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isMessage={formik.touched.correctAnswer}
                    message={formik.errors.correctAnswer}
                />
                <div className='flex flex-col w-full'>
                    <div style={{ marginBottom: '-8px' }}>
                        <InputField
                            inputType="text"
                            labelText="Options"
                            name="optionA"
                            placeHolder='eg: React JS'
                            messageType="error"
                            value={formik.values.optionA}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isMessage={formik.touched.optionA}
                            message={formik.errors.optionA}
                        />
                    </div>
                    <div style={{ marginBottom: '-8px' }}>
                        <InputField
                            inputType="text"
                            labelText=""
                            name="optionB"
                            placeHolder='eg: Angular '
                            messageType="error"
                            value={formik.values.optionB}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isMessage={formik.touched.optionB}
                            message={formik.errors.optionB}
                        />
                    </div>
                    <div style={{ marginBottom: '-8px' }}>
                        <InputField
                            inputType="text"
                            labelText=""
                            name="optionC"
                            placeHolder='eg: Angular '
                            messageType="error"
                            value={formik.values.optionC}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isMessage={formik.touched.optionC}
                            message={formik.errors.optionC}
                        />
                    </div>
                </div>
            </div>
            {
                isQuizAvailable ? <div className='flex justify-end gap-5 mt-10 mb-10'>
                    <Link to={TutorRoutes.hostCourse}>
                        <OutlineBtn btnText='Host your Course' />
                    </Link>
                    <PrimaryBtn onClick={formik.submitForm} btnText="Add Question" isLoading={!isLoading ? false : true} loadingText='Updating' />
                </div> : <div className='flex justify-end gap-5 mt-10 mb-10'>
                    <OutlineBtn onClick={formik.submitForm} btnText='Add Question' />
                    <PrimaryBtn onClick={handleCreateQuiz} btnText={isQuizAvailable ? "Save Changes" : "Create Quiz"} isLoading={!isLoading ? false : true} loadingText='Updating' />
                </div>
            }

            {
                (questionsArray.length > 0 || (quiz.questions.length > 0 && quiz.questions[0].question != "")) && <div className="w-full mb-5 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-800 dark:divide-gray-700" >
                    <div className="block px-4 py-2 font-medium text-center text-gray-700 rounded-t-lg bg-gray-50 dark:bg-gray-800 dark:text-white">
                        Added Questions
                    </div>
                    <div className="divide-y divide-gray-100 dark:divide-gray-700">
                        {
                            questionsArray.map((question) => (
                                <div className="flex flex-col gap-4 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                                    <div className="w-full pl-3">
                                        <div className="text-gray-500 text-sm mb-1.5 dark:text-gray-400"> <span className="font-semibold text-gray-900 dark:text-white">Question</span>: {question.question}</div>
                                        <div className="text-xs text-red-600 dark:text-red-600">Unsaved question</div>
                                    </div>
                                </div>
                            ))
                        }
                        {
                            isQuizAvailable && quiz.questions.map((question) => (
                                <div className="flex flex-col gap-4 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">

                                    <div className="w-full pl-3">
                                        <div className="text-gray-500 text-sm mb-1.5 dark:text-gray-400"> <span className="font-semibold text-gray-900 dark:text-white">Question</span>: {question.question}</div>
                                        <div className="text-xs text-green-600 dark:text-green-600">Saved question</div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    {/* <a href="#" className="block py-2 text-sm font-medium text-center text-gray-900 rounded-b-lg bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white">
                        <div className="inline-flex items-center ">
                            <svg className="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path><path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"></path></svg>
                            View more
                        </div>
                    </a> */}
                </div>
            }
        </div>
    )
}

export default CreateQuiz 