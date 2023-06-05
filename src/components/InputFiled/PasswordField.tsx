import React, { ChangeEvent, useState } from 'react';

interface PasswordFieldProps {
    labelText: string;
    name: string,
    value?: string;
    isMessage?: boolean;
    messageType?: "success" | "error" | "warning" | "info";
    message?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

const PasswordField: React.FC<PasswordFieldProps> = (props) => {
    const { labelText, name, messageType, message, isMessage, onChange } = props;
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    function togglePasswordVisibility() {
        setIsPasswordVisible((prevState) => !prevState);
    }

    let messageColorClass = '';
    switch (messageType) {
        case 'success':
            messageColorClass = 'text-green-600 dark:text-green-500';
            break;
        case 'error':
            messageColorClass = 'text-red-600 dark:text-red-500';
            break;
        case 'warning':
            messageColorClass = 'text-yellow-600 dark:text-yellow-500';
            break;
        case 'info':
            messageColorClass = 'text-light_primary_text dark:text-dark_primary_text';
            break;
        default:
            break;
    }

    return (
        <div className='my-4'>
            <label htmlFor="inputField" className="block mb-2 text-sm font-medium text-light_primary_text dark:text-dark_primary_text">
                {labelText}
            </label>
            <div className='relative'>
                <input
                    type={isPasswordVisible ? "text" : "password"}
                    name={name}
                    onChange={onChange}
                    className={`bg-light_secondary_bg dark:bg-dark_secondary_bg  text-light_primary_text dark:text-dark_primary_text placeholder-fade_text text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:border-light_primary focus:ring-1`}
                    placeholder="⁕⁕⁕⁕⁕⁕⁕⁕"
                />
                <button
                    className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600"
                    onClick={togglePasswordVisibility}
                >
                    {isPasswordVisible ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                            />
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                        </svg>
                    )}
                </button>
            </div>
            {isMessage && <p className={`mt-2 text-sm font-light ${messageColorClass}`}>{message}</p>}
        </div>
    );
};

export default PasswordField;
