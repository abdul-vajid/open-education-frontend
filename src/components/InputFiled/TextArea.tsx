
interface TextAreaProps {
    labelText: string;
    name: string,
    value?: string | number;
    isDisabled?: boolean;
    placeHolder?: string;
    isMessage?: boolean;
    messageType?: "success" | "error" | "warning" | "info";
    message?: string;
    onChange?: any
    onBlur?: any;
    onClick?: any
}

const TextArea: React.FC<TextAreaProps> = (props) => {
    const { labelText, name, placeHolder, messageType, message, isMessage, isDisabled, onChange, onClick, value } = props;

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
            {
                isDisabled ? <textarea
                    onClick={onClick}
                    value={value !== 0 ? value : undefined}
                    className={`bg-light_secondary_bg dark:bg-dark_secondary_bg  text-light_primary_text dark:text-dark_primary_text placeholder-fade_text text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:border-light_primary focus:ring-1`}
                    placeholder={placeHolder}
                    disabled
                /> :
                    <textarea
                        name={name}
                        onChange={onChange}
                        onClick={onClick}
                        value={value !== 0 ? value : undefined}
                        className={`bg-light_secondary_bg dark:bg-dark_secondary_bg  text-light_primary_text dark:text-dark_primary_text placeholder-fade_text text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:border-light_primary focus:ring-1`}
                        placeholder={placeHolder}
                    />
            }
            {isMessage && <p className={`mt-2 text-sm font-light ${messageColorClass}`}>{message}</p>}
        </div>

    );
};

export default TextArea;
