import React, { useMemo } from 'react';

export type Props = {
    value: string;
    valueLength: number;
    onChange: (value: string) => void;
    labelText: string;
    name: string;
    isMessage?: boolean;
    message?: string;
};

export default function OtpInput({ value, valueLength, onChange, isMessage, message, labelText, name }: Props) {
    const RE_DIGIT = new RegExp(/^\d+$/);
    const valueItems = useMemo(() => {
        const valueArray = value.split('');
        const items: Array<string> = [];

        for (let i = 0; i < valueLength; i++) {
            const char = valueArray[i];

            if (RE_DIGIT.test(char)) {
                items.push(char);
            } else {
                items.push('');
            }
        }

        return items;
    }, [value, valueLength]);

    const focusToNextInput = (target: HTMLElement) => {
        const nextElementSibling =
            target.nextElementSibling as HTMLInputElement | null;

        if (nextElementSibling) {
            nextElementSibling.focus();
        }
    };
    const focusToPrevInput = (target: HTMLElement) => {
        const previousElementSibling =
            target.previousElementSibling as HTMLInputElement | null;

        if (previousElementSibling) {
            previousElementSibling.focus();
        }
    };
    const inputOnChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        idx: number
    ) => {
        const target = e.target;
        let targetValue = target.value.trim();
        const isTargetValueDigit = RE_DIGIT.test(targetValue);

        if (!isTargetValueDigit && targetValue !== '') {
            return;
        }

        const nextInputEl = target.nextElementSibling as HTMLInputElement | null;

        // only delete digit if next input element has no value
        if (!isTargetValueDigit && nextInputEl && nextInputEl.value !== '') {
            return;
        }

        targetValue = isTargetValueDigit ? targetValue : ' ';

        const targetValueLength = targetValue.length;

        if (targetValueLength === 1) {
            const newValue =
                value.substring(0, idx) + targetValue + value.substring(idx + 1);

            onChange(newValue);

            if (!isTargetValueDigit) {
                return;
            }

            focusToNextInput(target);
        } else if (targetValueLength === valueLength) {
            onChange(targetValue);

            target.blur();
        }
    };
    const inputOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const { key } = e;
        const target = e.target as HTMLInputElement;

        if (key === 'ArrowRight' || key === 'ArrowDown') {
            e.preventDefault();
            return focusToNextInput(target);
        }

        if (key === 'ArrowLeft' || key === 'ArrowUp') {
            e.preventDefault();
            return focusToPrevInput(target);
        }

        const targetValue = target.value;

        // keep the selection range position
        // if the same digit was typed
        target.setSelectionRange(0, targetValue.length);

        if (e.key !== 'Backspace' || targetValue !== '') {
            return;
        }

        focusToPrevInput(target);
    };
    const inputOnFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        const { target } = e;

        // keep focusing back until previous input
        // element has value
        const prevInputEl =
            target.previousElementSibling as HTMLInputElement | null;

        if (prevInputEl && prevInputEl.value === '') {
            return prevInputEl.focus();
        }

        target.setSelectionRange(0, target.value.length);
    };

    return (
        <div className='my-4'>
            <label htmlFor="inputField" className="block mb-2 text-sm font-medium text-light_primary_text dark:text-dark_primary_text">
                {labelText}
            </label>
            <div>
                <div className='w-full flex justify-between'>
                    {valueItems.map((digit, idx) => (
                        <input
                            key={idx}
                            type="text"
                            inputMode="numeric"
                            autoComplete="one-time-code"
                            pattern="\d{1}"
                            maxLength={valueLength}
                            id={`inputField-${idx}`}
                            name={name}
                            value={digit}
                            className={`bg-light_secondary_bg dark:bg-dark_secondary_bg  text-light_primary_text dark:text-dark_primary_text placeholder-fade_text text-sm rounded-lg block w-10 p-2.5 pl-4 focus:outline-none focus:border-light_primary focus:ring-1`}
                            placeholder="⁕"
                            onChange={(e) => inputOnChange(e, idx)}
                            onKeyDown={inputOnKeyDown}
                            onFocus={inputOnFocus}
                        />
                    ))}
                </div>
            </div>
            {isMessage && <p className="mt-2 text-sm font-light text-red-600 dark:text-red-500">{message}</p>}
        </div>

    );
}


















// import React, { useRef } from 'react';

// interface OtpInputProps {
//     labelText: string;
//     name: string;
//     isMessage?: boolean;
//     messageType?: "success" | "error" | "warning" | "info";
//     message?: string;
//     onChange?: (value: number) => void;
// }

// const OtpInput: React.FC<OtpInputProps> = (props) => {
//     const { labelText, name, messageType, message, isMessage, onChange } = props;
//     const inputRefs = Array.from({ length: 6 }, () => useRef<HTMLInputElement>(null));

//     const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
//         const input = event.target;
//         const value = parseInt(input.value);

//         if (onChange) {
//             onChange(value);
//         }

//         const nextIndex = index < inputRefs.length - 1 ? index + 1 : index;
//         const prevIndex = index > 0 ? index - 1 : index;
//         const nextInput = inputRefs[nextIndex].current;
//         const prevInput = inputRefs[prevIndex].current;

//         if (event.nativeEvent instanceof KeyboardEvent && event.nativeEvent.key === 'Backspace' && input.value.length === 0 && prevInput) {
//             event.preventDefault();
//             prevInput.focus();
//         }

//         if (input.value.length > 1) {
//             input.value = input.value.slice(0, 1);
//         }

//         if (input.value.length > 0 && nextInput) {
//             nextInput.focus();
//         }
//     };

//     let messageColorClass = '';
//     switch (messageType) {
//         case 'success':
//             messageColorClass = 'text-green-600 dark:text-green-500';
//             break;
//         case 'error':
//             messageColorClass = 'text-red-600 dark:text-red-500';
//             break;
//         case 'warning':
//             messageColorClass = 'text-yellow-600 dark:text-yellow-500';
//             break;
//         case 'info':
//             messageColorClass = 'text-light_primary_text dark:text-dark_primary_text';
//             break;
//         default:
//             break;
//     }

//     return (
//         <div className='my-4'>
//             <label htmlFor="inputField" className="block mb-2 text-sm font-medium text-light_primary_text dark:text-dark_primary_text">
//                 {labelText}
//             </label>
//             <div>
//                 <div className='w-full flex justify-between'>
//                     {inputRefs.map((ref, index) => (
//                         <input
//                             key={index}
//                             ref={ref}
//                             type="number"
//                             id={`inputField-${index}`}
//                             name={`${name}${index}`}
//                             className={`bg-light_secondary_bg dark:bg-dark_secondary_bg  text-light_primary_text dark:text-dark_primary_text placeholder-fade_text text-sm rounded-lg block w-10 p-2.5 pl-4 focus:outline-none focus:border-light_primary focus:ring-1`}
//                             placeholder="⁕"
//                             maxLength={1}
//                             onChange={(event) => {
//                                 handleInputChange(event, index);
//                             }}
//                         />
//                     ))}
//                 </div>
//             </div>
//             {isMessage && <p className={`mt-2 text-sm font-light ${messageColorClass}`}>{message}</p>}
//         </div>
//     );
// };

// export default OtpInput;
