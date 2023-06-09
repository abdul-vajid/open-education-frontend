import React from 'react'

type SelectorButtonProps = {
    id: string
    title: string,
    position: "left" | "center" | "right"
    iconComponent?: any
    description?: string,
    onClick?: () => void,
    isChecked?: boolean
    disabled?: boolean
}

const SelectorButton: React.FC<SelectorButtonProps> = ({ id, title, description, iconComponent, onClick, isChecked, position, disabled }) => {
    return (
        <div className='w-full flex items-center'>
            <input type="checkbox" id={id} value="" onClick={onClick} className="hidden peer" disabled={disabled ? true : false} />
            <label htmlFor={id} className={`
                ${position === "right" ? "justify-end text-right" :
                    position === "center" ? "justify-center text-center" :
                        "justify-start text-left"}
                inline-flex items-center w-full p-5 text-light_primary_text dark:text-dark_primary_text bg-light_secondary_bg  dark:bg-dark_secondary_bg rounded-lg cursor-pointer ${isChecked === true ? "ring-1 peer-checked:ring-light_primary" : ""}`}>
                <div className="block">
                    <div className='flex align-middle'>
                        {
                            iconComponent && <span className='w-7 h-7'>{iconComponent}</span>
                        }
                        <div className="w-full text-sm md:text-md font-normal">{title}</div>
                    </div>
                    <div className="w-full text-xs">{description}</div>
                </div>
            </label>
        </div>
    )
}

export default SelectorButton