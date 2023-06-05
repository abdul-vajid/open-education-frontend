import React from 'react'
import InputField from '../../components/InputFiled/InputField'
import WFullPrimaryBtn from '../../components/Button/WFullPrimaryBtn'
import PasswordField from '../../components/InputFiled/PasswordField'


const LoginForm: React.FC = () => {

    return (
        <div className='bg-light_primary_bg dark:bg-dark_primary_bg h-auto w-[30%] rounded-lg p-14'>
            <span className='text-light_primary_text dark:text-dark_primary_text text-2xl font-semibold'>Sign in</span>

            <InputField labelText="Email" inputType='email' name='email' placeHolder="myemail@example.com" messageType="warning" message="Some warning message" />

            <PasswordField labelText='Password' name='password'/>

            <div className='my-10'>
                <WFullPrimaryBtn btnText='Continue' />
            </div>

            <p className='text-light_primary_text dark:text-dark_primary_text flex justify-center'>don't have an account? <span className="ml-2 text-light_primary dark:text-dark_primary">Sign up</span></p>
        </div>
    )
}

export default LoginForm