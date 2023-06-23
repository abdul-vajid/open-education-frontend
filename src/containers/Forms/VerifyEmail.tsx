import React, { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import InputField from '../../components/InputFiled/InputField'
import WFullPrimaryBtn from '../../components/Button/WFullPrimaryBtn'
import BackArrowButton from '../../components/Button/BackArrowButton'
import OtpInput from '../../components/InputFiled/OtpInput'
import { otpSchema } from '../../utils/validations/otpSchema'
import { useAppDispatch, useAppSelector } from '../../app/hooks/storeHooks'
import { useNavigate } from 'react-router-dom'
import { verifyEmailApi } from '../../app/api/authApi'
import { setAccessToken, setLoggedUserData } from '../../features/users/Common/userSlice'
import { useErrorToast, useSuccessToast } from '../../app/hooks/toastHooks'
import { clearAuthInfo } from '../../features/Public/authSlice'



const VerifyEmail: React.FC = () => {
    const confirmToken = useAppSelector(state => state.auth.token)
    const {} = useAppSelector(state => state.auth)
    const { email } = useAppSelector(state => state.auth)
    const user = useAppSelector(state => state.user)
    const dispatch = useAppDispatch()
    const [otpState, setOtpState] = useState('')
    const [loading, isLoading] = useState(false)
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            otp: 0,
        },

        validationSchema: otpSchema,

        onSubmit: (values) => {
            isLoading(true);
            verifyEmailApi({ otp: values.otp, token: confirmToken })
                .then((response) => {
                    if (response.data.success) {
                        useSuccessToast(response.data.message)
                        dispatch(setLoggedUserData(response.data.data));
                        dispatch(setAccessToken(response.data.accessToken))
                        dispatch(clearAuthInfo())
                        navigate(`/${user.role}`,
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

    const [resendTimer, setResendTimer] = useState(55);

    useEffect(() => {
        let interval: number;

        if (resendTimer > 0) {
            interval = setInterval(() => {
                setResendTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        }

        return () => {
            clearInterval(interval);
        };
    }, [resendTimer]);

    const handleOtpChange = (value: string) => {
        formik.setFieldValue("otp", parseInt(value));
        setOtpState(value)
    };

    useEffect(() => {
        if (!confirmToken || confirmToken === '') {
            navigate('/login')
        }
    }, [])

    return (
        <>
            <div className='bg-light_primary_bg dark:bg-dark_primary_bg h-auto w-[30%] rounded-lg p-14'>
                <BackArrowButton />
                <span className='text-light_primary_text dark:text-dark_primary_text text-2xl font-semibold'>Verify OTP</span>

                <InputField labelText="Entered Email" name='email' isDisabled inputType='email' value={email} />

                <OtpInput
                    labelText='Enter Otp'
                    name='otp'
                    onChange={handleOtpChange}
                    valueLength={6}
                    value={otpState}
                    isMessage={formik.touched.otp}
                    message={formik.errors.otp}
                />

                <div className='flex justify-between'>
                    <div className='items-baseline flex justify-start'>
                        <p className='text-sm font-thin pr-2 text-light_primary_text dark:text-dark_primary_text'>Resend OTP in</p>
                        <span className='text-xl text-light_primary dark:text-dark_primary'>{`00:${resendTimer.toString().padStart(2, '0')}`}</span>
                    </div>
                    <span className='text-light_primary dark:text-dark_primary text-sm'>Resend OTP</span>
                </div>

                <div className='my-10'>
                    <WFullPrimaryBtn btnText='Continue' type='submit' onClick={formik.submitForm} isLoading={loading} />
                </div>

                <p className='text-light_primary_text dark:text-dark_primary_text flex justify-center'> Already have an account? <span className="ml-2 text-light_primary dark:text-dark_primary">Sign in</span></p>
            </div>
        </>
    )
}

export default VerifyEmail
