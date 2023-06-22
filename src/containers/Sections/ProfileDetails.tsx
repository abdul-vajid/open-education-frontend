import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks/storeHooks'
import FileUpload from '../../components/InputFiled/FileUpload'
import InputField from '../../components/InputFiled/InputField'
import TextArea from '../../components/InputFiled/TextArea'
import { BiEdit } from "react-icons/bi";
import { CgClose } from "react-icons/cg";
import { useFormik } from 'formik'
import { useErrorToast, useSuccessToast } from '../../app/hooks/toastHooks'
import { updateUserProfileSchema } from '../../utils/validations/updateUserProfileSchema'
import { getUserProfile, updateProfile } from '../../features/users/Common/userSlice'
import useAxiosPrivate from '../../app/hooks/useAxiosPrivate'
import PrimaryBtn from '../../components/Button/PrimaryBtn'

type ProfileDetailsProps = {
    classNames?: string
}

const ProfileDetails: React.FC<ProfileDetailsProps> = ({ classNames }) => {
    const user = useAppSelector(state => state.user)
    const axiosInstance = useAxiosPrivate();
    const dispatch = useAppDispatch()
    const [isEditing, setAsEditing] = useState(false)

    const formik = useFormik({
        initialValues: {
            fullname: user.fullname,
            profileTitle: user.profileTitle,
            phoneNumber: user.phoneNumber,
            country: user.country,
            city: user.city,
            about: user.about,
            profilePicture: user.profilePicture
        },

        validationSchema: updateUserProfileSchema,

        onSubmit: async (values) => {
            dispatch(updateProfile({ body: values, axiosInstance })).then(() => {
                useSuccessToast({ message: 'Personal Infromation upadated' })
                setAsEditing(false)
            }).catch(() => {
                useErrorToast({
                    message: user?.postCallErrorMsg || "Something went wrong",
                });
            })
        },
    });
    const handleImageUpload = (imageUrl: string) => {
        formik.setValues((prevState) => ({
            ...prevState,
            profilePicture: imageUrl
        }));
        setAsEditing(true)
    };

    useEffect(() => {
        dispatch(getUserProfile(axiosInstance))
    }, [])


    return (
        <div className={`${classNames}bg-light_primary_bg dark:bg-dark_primary_bg h-full rounded-lg p-8`}>
            <div className='flex flex-col gap-3 mb-8'>
                <span className='text-light_primary_text dark:text-dark_primary_text text-lg md:text-xl lg:text-2xl font-semibold'>Personal Information</span>
                <span className='text-xs text-light_secondary_text dark:text-dark_secondary_text'>This Information will be displayed publicly, so be careful what you share. </span>
            </div>
            <span className='text-md text-light_secondary_text dark:text-dark_secondary_text '>Profile Picture</span>
            {
                (user.profilePicture && !isEditing) ? <img src={user.profilePicture} alt={`${user.fullname}'s profile picture`} className='w-64 h-64 rounded-lg mt-2' /> :
                    <div className='flex justify-start mb-8'>
                        <FileUpload externalErr={formik.errors.profilePicture}  isSquareImage={true} id='profilePicture'  onChange={(imageUrl) => handleImageUpload(imageUrl)}/>
                    </div>
            }

            <div className='flex justify-end gap-2 text-light_primary dark:text-dark_primary cursor-pointer' onClick={() => setAsEditing(!isEditing)}>
                {!isEditing ? <BiEdit /> : <CgClose />}
                <span className='text-xs'>{!isEditing ? "Edit Info" : "Cancel"}</span>
            </div>
            <div className="flex justify-between w-full gap-5">
                <div className="flex-1">
                    <InputField
                        inputType="text"
                        labelText="Full Name"
                        name="fullname"
                        placeHolder='eg: Jhon Doe'
                        messageType="error"
                        value={formik.values.fullname}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isMessage={isEditing}
                        message={formik.errors.fullname}
                        isDisabled={isEditing === true ? false : true}
                    />
                </div>
                <div className="flex-1">
                    <InputField
                        inputType="text"
                        labelText="Profile Title"
                        name="profileTitle"
                        placeHolder='eg: Graphic Designer'
                        messageType="error"
                        value={formik.values.profileTitle}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isMessage={isEditing}
                        message={formik.errors.profileTitle}
                        isDisabled={isEditing === true ? false : true}
                    />
                </div>
            </div>
            <div className="flex justify-between w-full gap-5">
                <div className="flex-1">
                    <InputField inputType="text" labelText="Email" name="email" isDisabled={true} value={user.email} message='Email cannot be changed' isMessage={true} messageType='info' />
                </div>
                <div className="flex-1">
                    <InputField
                        inputType="number"
                        labelText="Phone Number"
                        name="phoneNumber"
                        messageType="error"
                        placeHolder='eg: 9876543210'
                        value={formik.values.phoneNumber}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isMessage={isEditing}
                        message={formik.errors.phoneNumber}
                        isDisabled={isEditing === true ? false : true}
                    />
                </div>
            </div>
            <div className="flex justify-between w-full gap-5">
                <div className="flex-1">
                    <InputField
                        inputType="text"
                        labelText="Country"
                        name="country"
                        messageType="error"
                        placeHolder='eg: India'
                        value={formik.values.country}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isMessage={isEditing}
                        message={formik.errors.country}
                        isDisabled={isEditing === true ? false : true}
                    />
                </div>
                <div className="flex-1">
                    <InputField
                        inputType="text"
                        labelText="City"
                        name="city"
                        messageType="error"
                        placeHolder='eg: Mumbai'
                        value={formik.values.city}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        isMessage={isEditing}
                        message={formik.errors.city}
                        isDisabled={isEditing === true ? false : true}
                    />
                </div>
            </div>
            <TextArea
                labelText='About Me'
                name='about'
                placeHolder='eg:  Creative and detail-oriented graphic designer with 5 years of experience in branding, print, and digital design. Passionate about delivering high-quality designs that exceed client expectations.'
                messageType="error"
                value={formik.values.about}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isMessage={isEditing}
                message={formik.errors.about}
                isDisabled={isEditing === true ? false : true}
            />
            <div className='flex justify-end mt-10 mb-5'>
                <PrimaryBtn onClick={formik.submitForm} btnText='Save Changes' isDisabled={isEditing === true ? false : true} isLoading={user?.isLoading === true ? true : false} loadingText='Updating' />
            </div>
        </div>
    )
}

export default ProfileDetails 