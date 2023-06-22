import React, { ChangeEvent } from 'react';

interface SelectInputProps {
    labelText: string;
    name: string,
    value?: string | number;
    isDisabled?: boolean;
    placeHolder?: string;
    isMessage?: boolean;
    messageType?: "success" | "error" | "warning" | "info";
    message?: string;
    onBlur?: any;
    onClick?: any
    isInverted?: boolean
    classNames?: string
    onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
    optionList: string[]
}

const SelectInput: React.FC<SelectInputProps> = (props) => {
    const { labelText, name, placeHolder, value, isInverted, isMessage, message, onChange, optionList } = props;

    return (
        <div className='my-4'>
            <label htmlFor="SelectInput" className="block mb-2 text-sm font-medium text-light_primary_text dark:text-dark_primary_text">
                {labelText}
            </label>
            <select
                name={name}
                value={value !== 0 ? value : undefined}
                className={`${isInverted ? "bg-light_primary_bg dark:bg-dark_primary_bg" : "bg-light_secondary_bg dark:bg-dark_secondary_bg "} text-light_primary_text dark:text-dark_primary_text placeholder-fade_text text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:border-light_primary focus:ring-1`}
                placeholder={placeHolder}
                onChange={onChange}
            >
                <option value={undefined}>Select from list</option>
                {
                    optionList.map((field) => (
                        <option key={field} value={field}>{field}</option>
                    ))
                }
            </select>
            {isMessage && <p className="mt-2 text-sm font-light text-red-500">{message}</p>}
        </div>
    );
};

export default SelectInput;
