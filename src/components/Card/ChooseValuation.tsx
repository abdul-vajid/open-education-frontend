import React from 'react'
import { useFormik } from 'formik'
import PrimaryBtn from '../../components/Button/PrimaryBtn'
import SelectorButton from '../Button/SelectorButton'

type ChooseValuationProps = {
    classNames?: string
}

const ChooseValuation: React.FC<ChooseValuationProps> = ({ classNames }) => {


    const formik = useFormik({
        initialValues: {
        },

        onSubmit: async () => {

        },
    });

    return (
        <div className={`${classNames}bg-light_primary_bg dark:bg-dark_primary_bg h-full rounded-lg p-8`}>
            <div className='flex flex-col gap-3 mb-8'>
                <span className='text-light_primary_text dark:text-dark_primary_text text-lg md:text-xl lg:text-2xl font-semibold'>Choose Valuation</span>
                <span className='text-xs text-light_secondary_text dark:text-dark_secondary_text'>We highly recommend opting for lesson-based valuation, as it is a widely preferred approach in open education. By choosing this method, you significantly enhance your chances of enrollment.</span>
            </div>
            <div className="flex justify-between w-full gap-5">
                <div className="flex-1">
                    <SelectorButton id='lesson-based' position='center' title='Lesson-based' description='High Popularity' />
                </div>
                <div className="flex-1">
                    <SelectorButton id='course-based' position='center' title='Course-based' description='Less Popularity ' />
                </div>
            </div>
            <div className='flex justify-end mt-10 mb-5'>
                <PrimaryBtn onClick={formik.submitForm} btnText='Save Changes' loadingText='Updating' />
            </div>
        </div>
    )
}

export default ChooseValuation 