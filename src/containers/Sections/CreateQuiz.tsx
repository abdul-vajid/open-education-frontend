import React from 'react'
import InputField from '../../components/InputFiled/InputField'
import TextArea from '../../components/InputFiled/TextArea'
import { useFormik } from 'formik'
import PrimaryBtn from '../../components/Button/PrimaryBtn'
import OutlineBtn from '../../components/Button/OutlineBtn'

type CreateQuizProps = {
    classNames?: string
}

const CreateQuiz: React.FC<CreateQuizProps> = ({ classNames }) => {


    const formik = useFormik({
        initialValues: {
        },

        onSubmit: async () => {

        },
    });

    return (
        <div className={`${classNames}bg-light_primary_bg dark:bg-dark_primary_bg h-full rounded-lg p-8`}>
            <div className='flex flex-col gap-3 mb-8'>
                <span className='text-light_primary_text dark:text-dark_primary_text text-lg md:text-xl lg:text-2xl font-semibold'>Create Quiz</span>
                <span className='text-xs text-light_secondary_text dark:text-dark_secondary_text'>No worries! Our bot will shuffle the options, so the order doesn't matter. Please proceed with creating the quiz confidently. </span>
            </div>
            <TextArea
                labelText='Question 1'
                name='question'
                placeHolder='eg:  Which runtime environment allows developers to execute JavaScript code outside of a web browser?'
                messageType="error"
            />
            <div className="flex flex-col w-full gap-1">
                <InputField
                    inputType="text"
                    labelText="Correct Answer"
                    name="correctAnswer"
                    placeHolder='eg: Node.js'
                    messageType="error"
                />
                <div className='flex flex-col w-full'>
                    <div style={{ marginBottom: '-8px' }}>
                        <InputField
                            inputType="text"
                            labelText="Options"
                            name="optionA"
                            placeHolder='eg: React JS'
                            messageType="error"
                        />
                    </div>
                    <div style={{ marginBottom: '-8px' }}>
                        <InputField
                            inputType="text"
                            labelText=""
                            name="optionB"
                            placeHolder='eg: Angular '
                            messageType="error"
                        />
                    </div>
                    <div style={{ marginBottom: '-8px' }}>
                        <InputField
                            inputType="text"
                            labelText=""
                            name="optionB"
                            placeHolder='eg: Angular '
                            messageType="error"
                        />
                    </div>
                </div>
            </div>
            <div className='flex justify-between mt-10 mb-5'>
                <div className='flex gap-2'>
                    <OutlineBtn btnText='Pervious'/>
                    <OutlineBtn btnText='Next'/>
                </div>
                <PrimaryBtn onClick={formik.submitForm} btnText='Save Changes' loadingText='Updating' />
            </div>
        </div>
    )
}

export default CreateQuiz 