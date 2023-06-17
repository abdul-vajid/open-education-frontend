import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import InputField from '../../components/InputFiled/InputField'
import TextArea from '../../components/InputFiled/TextArea'
import WFullPrimaryBtn from '../../components/Button/WFullPrimaryBtn'
import { useErrorToast, useSuccessToast } from '../../app/hooks/toastHooks'
import { createCourseSchema } from '../../utils/validations/createCourseSchema'
import useAxiosPrivate from '../../app/hooks/useAxiosPrivate'
import { useFormik } from 'formik'
import { useAppDispatch } from '../../app/hooks/storeHooks'
import { fetchCourses } from '../../features/users/Tutor/tutorCoursesSlice'
import { CourseStatus } from '../../app/types/enums';

type CreateCourseProps = {
    classNames?: string
    close: any;
}

const CreateCourse: React.FC<CreateCourseProps> = ({ classNames, close }) => {
    const [loading, isLoading] = useState(false)
    const axios = useAxiosPrivate()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            courseTitle: "",
            fieldOfStudy: "",
            description: "",
            prerequisites: "",
        },

        validationSchema: createCourseSchema,

        onSubmit: async (values) => {
            isLoading(true);
            await axios.post('/course/create-course', {
                courseTitle: values.courseTitle,
                fieldOfStudy: values.fieldOfStudy,
                description: values.description,
                prerequisites: values.prerequisites.split(',')
            })
                .then((res: any) => {
                    if (res.data.success === true) {
                        formik.resetForm();
                        res.data.message && useSuccessToast({
                            message: res.data.message
                        });
                        dispatch(fetchCourses(axios));
                        navigate(`/tutor/course/details/${CourseStatus.Draft}/${res.data.data.courseId}`,
                            {
                                replace: true
                            });
                    } else {
                        useErrorToast({
                            message: res.data.message || "Something went wrong",
                        });
                    }
                })
                .catch((err: any) => {
                    useErrorToast({
                        message: err?.response?.data?.message || "Something went wrong",
                    });
                })
                .finally(() => {
                    isLoading(false);
                });
        }
    });

    return (
        <div className={`${classNames}bg-light_primary_bg dark:bg-dark_primary_bg h-full w-full rounded-lg p-8 mb-5`}>
            <div className='flex justify-between'>
                <span className='text-light_primary_text dark:text-dark_primary_text text-lg md:text-xl lg:text-2xl font-semibold'>Create Course</span>
                {
                    close
                }
            </div>
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
                name='fieldOfStudy'
                placeHolder='eg: Digital marketing'
                messageType='error'
                onChange={formik.handleChange}
                message={formik.errors.courseTitle}
                value={formik.values.fieldOfStudy}
                isMessage={formik.touched.fieldOfStudy}
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
                isMessage={true}
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                message={formik.errors.description}
            />
            <div className="mt-5">
                <WFullPrimaryBtn btnText='Create Now' type='submit' onClick={formik.submitForm} isLoading={loading} />
            </div>
        </div>
    )
}

export default CreateCourse