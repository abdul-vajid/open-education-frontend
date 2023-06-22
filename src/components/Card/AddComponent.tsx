import React from 'react'

type AddComponentProps = {
    classNames?: string
}

const AddComponent: React.FC<AddComponentProps> = ({ classNames }) => {
    return (
        <div className={`${classNames}bg-light_primary_bg dark:bg-dark_primary_bg rounded-lg p-8`}>
            <span className='text-light_primary_text dark:text-dark_primary_text text-lg md:text-xl lg:text-2xl font-semibold'>Add Component</span>


        </div>
    )
}

export default AddComponent