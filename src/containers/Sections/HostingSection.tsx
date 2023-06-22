import React from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks/storeHooks'
import FileUpload from '../../components/InputFiled/FileUpload'
import InputField from '../../components/InputFiled/InputField'
import TextArea from '../../components/InputFiled/TextArea'
import { useFormik } from 'formik'
import { useErrorToast, useSuccessToast } from '../../app/hooks/toastHooks'
import useAxiosPrivate from '../../app/hooks/useAxiosPrivate'
import PrimaryBtn from '../../components/Button/PrimaryBtn'
import SelectInput from '../../components/InputFiled/SelectInput'
import { fieldOfStudyList } from '../../app/constants/BasicConstants';
import OutlineBtn from '../../components/Button/OutlineBtn'
import { hostCourseSchema } from '../../utils/validations/hostCourseSchema'
import { hostCourse } from '../../features/users/Tutor/currentCourseSlice'
import { Link, useNavigate } from 'react-router-dom'
import { TutorRoutes } from '../../app/types/enums'

type HostingSectionProps = {
    classNames?: string
}

const HostingSection: React.FC<HostingSectionProps> = ({ classNames }) => {
    const { course, courseHostingErrorMsg, isCourseHosting } = useAppSelector(state => state.currentCourse)
    const axiosInstance = useAxiosPrivate();
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const formik = useFormik({
        initialValues: {
            courseId: course._id,
            courseTitle: course.courseTitle,
            fieldOfStudy: course.fieldOfStudy,
            prerequisites: course.prerequisites.toString(),
            description: course.description,
            imageUrl: "",
            difficulty: "",
            courseFee: "",
            paymentMode: "",
        },

        validationSchema: hostCourseSchema,

        onSubmit: async (values) => {
            dispatch(hostCourse({
                axiosInstance,
                body: {
                    courseId: values.courseId,
                    courseTitle: values.courseTitle,
                    fieldOfStudy: values.fieldOfStudy,
                    prerequisites: values.prerequisites.split(","),
                    description: values.description,
                    imageUrl: values.imageUrl,
                    difficulty: values.difficulty,
                    courseFee: values.courseFee,
                    paymentMode: values.paymentMode
                }
            })).then((action) => {
                const response = action.payload;
                if (response.status === "fulfilled") {
                    useSuccessToast({ message: response.message || 'Your course successfully hosted' })
                    navigate(TutorRoutes.courseDetails)
                }
            }).catch(() => {
                useErrorToast({
                    message: courseHostingErrorMsg ? courseHostingErrorMsg : "Something went wrong",
                });
            })
        },
    });

    const handleImageUpload = (imageUrl: string) => {
        formik.setValues((prevState) => ({
            ...prevState,
            imageUrl: imageUrl
        }));
    };


    return (
        <div className={`${classNames}bg-light_primary_bg dark:bg-dark_primary_bg h-full rounded-lg p-8`}>
            <div className='flex flex-col gap-3 mb-8'>
                <span className='text-light_primary_text dark:text-dark_primary_text text-lg md:text-xl lg:text-2xl font-semibold'>Host Your Course</span>
                <span className='text-xs text-light_secondary_text dark:text-dark_secondary_text'>Important Notice: Once your course is hosted, no further edits can be made. Take this opportunity to review and finalize your course content before proceeding.</span>
            </div>
            <div className='flex gap-10 items-baseline'>
                <div>
                    <span className='text-md text-light_secondary_text dark:text-dark_secondary_text'>Cover Picture</span>
                    <div className='flex justify-start mb-8'>
                        <FileUpload externalErr={formik.errors.imageUrl} isSquareImage={true} id='profilePicture' onChange={(imageUrl) => handleImageUpload(imageUrl)} />
                    </div>
                </div>

                <div className='w-full'>
                    <InputField
                        inputType="text"
                        labelText="Course Title"
                        name="courseTitle"
                        placeHolder='eg: Web development crash course'
                        messageType="error"
                        isMessage={true}
                        value={formik.values.courseTitle}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        message={formik.errors.courseTitle}
                    />
                    <div className="flex justify-between w-full gap-5">
                        <div className="flex-1">
                            <SelectInput
                                labelText="Field Of Study"
                                name="fieldOfStudy"
                                messageType="error"
                                optionList={fieldOfStudyList}
                                isMessage={true}
                                value={formik.values.fieldOfStudy}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                message={formik.errors.fieldOfStudy}
                            />
                        </div>
                        <div className="flex-1">
                            <SelectInput
                                labelText="Difficulty"
                                name="difficulty"
                                messageType="error"
                                optionList={["Easy", "Medium", "Hard"]}
                                isMessage={true}
                                value={formik.values.difficulty}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                message={formik.errors.difficulty}
                            />
                        </div>
                    </div>
                    <div className="flex justify-between w-full gap-5">
                        <div className="flex-1">
                            <InputField
                                inputType="number"
                                step="0.01"
                                labelText="Course Fee (₹)"
                                name="courseFee"
                                messageType="error"
                                placeHolder='4999'
                                isMessage={true}
                                value={formik.values.courseFee}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                message={formik.errors.courseFee}
                            />
                        </div>
                        <div className="flex-1">
                            <SelectInput
                                labelText="Payment Mode"
                                name="paymentMode"
                                messageType="error"
                                optionList={["Course-based", "Lesson-based"]}
                                isMessage={true}
                                value={formik.values.paymentMode}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                message={formik.errors.paymentMode}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <InputField
                inputType="text"
                labelText="Prerequisites"
                name="prerequisites"
                messageType="error"
                placeHolder='eg: Basic computer knowledge, Must be able to read and write english'
                isMessage={true}
                value={formik.values.prerequisites.toString()}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                message={formik.errors.prerequisites}
            />
            <TextArea
                labelText='Description'
                name='description'
                placeHolder='eg: Unleash your web development potential with our comprehensive online course. Master HTML, CSS, JavaScript, responsive design, front-end frameworks, back-end technologies, and more. Learn from industry experts, gain hands-on experience, and join a supportive community. Propel your career in web development today!'
                messageType="error"
                isMessage={true}
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                message={formik.errors.description}
            />
            <div className='flex justify-end gap-5 mt-10 mb-5'>
                <Link to={TutorRoutes.courseDetails} replace={true}>
                    <OutlineBtn btnText='Discard' />
                </Link>
                <PrimaryBtn onClick={formik.submitForm} btnText='Host Your Course' loadingText='Hosting..' isLoading={isCourseHosting ? true : false} />
            </div>
        </div>
    )
}

export default HostingSection 