import React from 'react'
import InputField from '../../components/InputFiled/InputField'
import TextArea from '../../components/InputFiled/TextArea'
import WFullPrimaryBtn from '../../components/Button/WFullPrimaryBtn'

type CreateCourseProps = {
    classNames?: string
}

const CreateCourse: React.FC<CreateCourseProps> = ({ classNames }) => {
    return (
        <div className={`${classNames}bg-light_primary_bg dark:bg-dark_primary_bg h-full w-full rounded-lg p-8 mb-5`}>
            <span className='text-light_primary_text dark:text-dark_primary_text text-lg md:text-xl lg:text-2xl font-semibold'>Create Course</span>
            <ul>
                <InputField inputType='text' labelText='Course Title' name='courseTitle' placeHolder='eg: Fundamentals of digital marketing' />
                <InputField inputType='text' labelText='Field of study' name='filedOfStudy' placeHolder='eg: Digital marketing' />
                <InputField inputType='text' labelText='Prerequisites' name="prerequisites" placeHolder='eg: Fundamentals of digital marketing' />

                <TextArea labelText='Prerequisites' name='prerequisites'
                    placeHolder='eg: Basic English Knowledge, Basic Computer Knowledge, No need of any degree'
                    isMessage={true} messageType='info' message='Separate the prerequisites using commas'
                />
                <TextArea labelText='Description' name='description' placeHolder='Provide a good description for your course' />
                <div className="mt-5">
                    <WFullPrimaryBtn btnText='Create Now' />
                </div>
            </ul>
        </div>
    )
}

export default CreateCourse