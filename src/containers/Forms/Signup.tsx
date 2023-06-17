import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import WFullPrimaryBtn from '../../components/Button/WFullPrimaryBtn'
import { useAppDispatch, useAppSelector } from '../../app/hooks/storeHooks'
import { useFormik } from 'formik'
import { signupSchema } from '../../utils/validations/signupSchema'
import { setUserInfo } from '../../features/Public/authSlice'
import InputField from '../../components/InputFiled/InputField'



const SignupForm: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate();
  const role = useAppSelector(state => state.public.role)
  const savedState = useAppSelector(state => state.auth)


  const formik = useFormik({
    initialValues: {
      fullname: savedState.fullname ? savedState.fullname : "",
      email: savedState.email ? savedState.email : "",
      phoneNumber: savedState.phoneNumber ? savedState.phoneNumber : 0,
      role: role
    },

    validationSchema: signupSchema,

    onSubmit: (values) => {
      dispatch(setUserInfo({
        fullname: values.fullname,
        email: values.email,
        phoneNumber: values.phoneNumber,
        role: role
      }))
      navigate("/set-password");
    },
  })

  return (
    <div className='bg-light_primary_bg dark:bg-dark_primary_bg h-auto w-[30%] rounded-lg p-14'>
      <span className='text-light_primary_text dark:text-dark_primary_text text-2xl font-semibold'>Create account</span>

      <InputField
        labelText="Full Name"
        inputType="text"
        name="fullname"
        placeHolder="eg: Jhon Doe"
        messageType="error"
        value={formik.values.fullname}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        isMessage={formik.touched.fullname}
        message={formik.errors.fullname}
      />

      <InputField
        labelText="Phone Number"
        inputType="number"
        name="phoneNumber"
        placeHolder="eg: +15551234567"
        messageType="error"
        value={formik.values.phoneNumber}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        isMessage={formik.touched.phoneNumber}
        message={formik.errors.phoneNumber}
      />

      <InputField
        labelText="Email"
        inputType="email"
        name="email"
        placeHolder="myemail@example.com"
        messageType="error"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        isMessage={formik.touched.email}
        message={formik.errors.email}
      />


      <div className='my-10'>
        <WFullPrimaryBtn btnText='Continue' type='submit' onClick={formik.submitForm} />
      </div>
      <Link to="/login">
        <p className='text-light_primary_text dark:text-dark_primary_text flex justify-center cursor-pointer'>Already have an account? <span className="ml-2 text-light_primary dark:text-dark_primary">Sign in</span></p>
      </Link>
    </div>
  )
}

export default SignupForm
