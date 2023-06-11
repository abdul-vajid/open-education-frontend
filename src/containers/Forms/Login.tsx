import React, { useState } from 'react'
import { useFormik } from 'formik'
import InputField from '../../components/InputFiled/InputField'
import WFullPrimaryBtn from '../../components/Button/WFullPrimaryBtn'
import PasswordField from '../../components/InputFiled/PasswordField'
import { useAppDispatch, useAppSelector } from '../../app/hooks/storeHooks'
import { useNavigate } from 'react-router-dom'
import { loginApi } from '../../app/api/authApi'
import { useErrorToast, useSuccessToast } from '../../app/hooks/toastHooks'
import { setAccessToken, setLoggedUserData } from '../../features/users/Common/userSlice'
import { loginSchema } from '../../utils/validations/loginSchema'


const LoginForm: React.FC = () => {
    const user = useAppSelector(state => state.user)
    const dispatch = useAppDispatch()
    const [loading, isLoading] = useState(false)
    const navigate = useNavigate()

    const formik =  useFormik({
        initialValues: {
            email: "",
            password: ""
        },

        validationSchema: loginSchema,

        onSubmit: async (values) => {
            isLoading(true);
            await loginApi({ email: values.email, password: values.password })
            .then((response) => {
                    if (response.data.success) {
                        useSuccessToast(response.data.message)
                        dispatch(setLoggedUserData(response.data.data));
                        dispatch(setAccessToken(response.data.accessToken))
                        navigate(`/${response.data.data.role}`,
                            {
                                replace: true
                            });
                    } else useErrorToast({ message: response.data.message });
                })
                .catch((err) => {
                    useErrorToast({
                        message: err?.response?.data?.message || "Something went wrong",
                    });
                })
                .finally(() => {
                    isLoading(false);
                });
        },
    });

    return (
        <div className='bg-light_primary_bg dark:bg-dark_primary_bg h-auto w-[30%] rounded-lg p-14'>
            <span className='text-light_primary_text dark:text-dark_primary_text text-2xl font-semibold'>Sign in</span>

            <InputField
                labelText="Email"
                inputType='email'
                name='email'
                placeHolder="myemail@example.com"
                messageType="error"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isMessage={formik.touched.email}
                message={formik.errors.email}
            />

            <PasswordField
                labelText='Password'
                name='password'
                messageType='error'
                value={formik.values.password}
                onChange={formik.handleChange}
                isMessage={formik.touched.password}
                message={formik.errors.password}
            />

            <div className='my-10'>
                <WFullPrimaryBtn btnText='Login' type='submit' onClick={formik.submitForm} isLoading={loading} />
            </div>

            <p className='text-light_primary_text dark:text-dark_primary_text flex justify-center'>don't have an account? <span className="ml-2 text-light_primary dark:text-dark_primary">Sign up</span></p>
        </div>
    )
}

export default LoginForm