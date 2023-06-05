import React, { useState, useEffect } from 'react'
import { useFormik } from "formik"
import { Link, useNavigate, } from "react-router-dom";
import InputField from '../../components/InputFiled/InputField'
import WFullPrimaryBtn from '../../components/Button/WFullPrimaryBtn'
import PasswordField from '../../components/InputFiled/PasswordField'
import BackArrowButton from '../../components/Button/BackArrowButton'
import { setPasswordSchema } from '../../utils/validations/setPasswordSchema'
import { useAppSelector } from '../../app/hooks/storeHooks'
import { signupApi } from '../../app/api/authApi'
import { useErrorToast, useSuccessToast } from '../../app/hooks/toastHooks';
import { useAppDispatch } from '../../app/hooks/storeHooks';
import { setConfirmationToken } from '../../features/Public/authSlice';

const SetPassword: React.FC = () => {
    const { email, fullname, phoneNumber, role } = useAppSelector(state => state.auth)
    const [isLoading, setLoading] = useState(false)
    const navigate = useNavigate();
    const dispatch = useAppDispatch()


    const formik = useFormik({
        initialValues: {
            password: "",
            confirmPassword: ""
        },

        validationSchema: setPasswordSchema,

        onSubmit: async (values) => {
            setLoading(true);
            console.log(values)
            await signupApi({
                email,
                fullname,
                phoneNumber,
                password: values.password,
                role
            })
                .then((res) => {
                    if (res.data.success === true) {
                        res.data.message && useSuccessToast({
                            message: res.data.message
                        });
                        navigate("/verify-email");
                        dispatch(setConfirmationToken(res.data?.data?.confirmToken))
                    } else {
                        useErrorToast({
                            message: res.data.message || "Something went wrong",
                        });
                    }
                })
                .catch((err) => {
                    useErrorToast({
                        message: err?.response?.data?.message || "Something went wrong",
                    });
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    })

    useEffect(() => {
        if (!email || email === "" || !fullname || !phoneNumber || !role) {
            navigate('/login')
        }
    }, [])


    return (
        <>
            <div className='bg-light_primary_bg dark:bg-dark_primary_bg h-auto w-[30%] rounded-lg p-14'>
                <Link to={role === "tutor" ? '/tutor/signup' : '/signup'}>
                    <BackArrowButton />
                </Link>
                <span className='text-light_primary_text dark:text-dark_primary_text text-2xl font-semibold'>Set Password</span>

                <InputField
                    labelText="Entered Email"
                    inputType="email"
                    name="email"
                    messageType="error"
                    value={email}
                    isDisabled
                />

                <PasswordField labelText='Password' name='password'
                    messageType="error"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    isMessage={formik.touched.password}
                    message={formik.errors.password}
                />
                <PasswordField labelText='Confirm Password' name='confirmPassword'
                    messageType="error"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    isMessage={formik.touched.confirmPassword}
                    message={formik.errors.confirmPassword}
                />

                <div className='my-10'>
                    <WFullPrimaryBtn btnText='Continue' type='submit' onClick={formik.submitForm} isLoading={isLoading} />
                </div>

                <p className='text-light_primary_text dark:text-dark_primary_text flex justify-center'> Already have an account? <span className="ml-2 text-light_primary dark:text-dark_primary">Sign in</span></p>
            </div>
        </>
    )
}

export default SetPassword