import React, { useState } from 'react'
import InputField from '../../components/InputFiled/InputField'
import TextArea from '../../components/InputFiled/TextArea'
import WFullPrimaryBtn from '../../components/Button/WFullPrimaryBtn'
import { useAppDispatch, useAppSelector } from '../../app/hooks/storeHooks'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { useErrorToast, useSuccessToast } from '../../app/hooks/toastHooks'
import { createCourseSchema } from '../../utils/validations/createCourseSchema'
import useAxiosPrivate from '../../app/hooks/useAxiosPrivate'

type CreateCourseProps = {
    classNames?: string
}

const CreateCourse: React.FC<CreateCourseProps> = ({ classNames }) => {
    const user = useAppSelector(state => state.user)
    const dispatch = useAppDispatch()
    const [loading, isLoading] = useState(false)
    const navigate = useNavigate()
    const axios = useAxiosPrivate()

    const formik = useFormik({
        initialValues: {
            courseTitle: "",
            fieldOfStudy: "",
            description: "",
            prerequisites: ""
        },

        validationSchema: createCourseSchema,

        onSubmit: async (values) => {
            isLoading(true);
            await axios.post('/tutor/create-course', values)
                .then((response: any) => {
                    if (response.data.success) {
                        useSuccessToast(response.data.message)
                        // navigate(`/${response.data.data.role}`,
                        //     {
                        //         replace: true
                        //     });
                    } else useErrorToast({ message: response.data.message });
                })
                .catch((err: any) => {
                    useErrorToast({
                        message: err?.response?.data?.message || "Something went wrong",
                    });
                })
                .finally(() => {
                    isLoading(false);
                });
        },
    });

    return (
        <div className={`${classNames}bg-light_primary_bg dark:bg-dark_primary_bg h-full w-full rounded-lg p-8 mb-5`}>
            <span className='text-light_primary_text dark:text-dark_primary_text text-lg md:text-xl lg:text-2xl font-semibold'>Create Course</span>
            <ul>
                <InputField
                    inputType='text'
                    labelText='Course Title'
                    name='courseTitle'
                    placeHolder='eg: Fundamentals of digital marketing'
                    messageType="error"
                    value={formik.values.courseTitle}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isMessage={formik.touched.courseTitle}
                    message={formik.errors.courseTitle}
                />
                <InputField
                    inputType='text'
                    labelText='Field of study'
                    name='filedOfStudy'
                    placeHolder='eg: Digital marketing'
                    messageType="error"
                    value={formik.values.fieldOfStudy}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isMessage={formik.touched.fieldOfStudy}
                    message={formik.errors.fieldOfStudy}
                />
                <InputField
                    inputType='text'
                    labelText='Prerequisites'
                    name="prerequisites"
                    placeHolder='eg: Fundamentals of digital marketing'
                    messageType="error"
                    value={formik.values.prerequisites}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isMessage={formik.touched.prerequisites}
                    message={formik.errors.prerequisites}
                />

                <TextArea
                    labelText='Prerequisites'
                    name='prerequisites'
                    placeHolder='eg: Basic English Knowledge, Basic Computer Knowledge, No need of any degree'
                    isMessage={true}
                    messageType={formik.errors.prerequisites ? "error" : "info"}
                    value={formik.values.prerequisites}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    message={formik.errors.prerequisites}
                />
                <TextArea
                    labelText='Description'
                    name='description'
                    placeHolder='Provide a good description for your course'
                    messageType="error"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    message={formik.errors.description}
                />
                <div className="mt-5">
                    <WFullPrimaryBtn btnText='Create Now' onClick={formik.submitForm} isLoading={loading} />
                </div>
            </ul>
        </div>
    )
}

export default CreateCourse