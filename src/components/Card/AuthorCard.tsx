import React from 'react'
import PrimaryBtn from '../Button/PrimaryBtn'
import OutlineBtn from '../Button/OutlineBtn'
import { RiMessage3Line } from "react-icons/ri"
import imgNotFound from "../../utils/assets/image-not-found.png"
import { useAppDispatch, useAppSelector } from '../../app/hooks/storeHooks'
import { accessChatByUser } from '../../features/users/Common/inboxSlice'
import useAxiosPrivate from '../../app/hooks/useAxiosPrivate'
import { IAuthorDetails } from '../../app/types/interfaces'
import { useNavigate } from 'react-router-dom'

type AuthorCardProps = {
    user: IAuthorDetails
    primaryOnClick?: () => void
    outlineOnClick?: () => void
}


const AuthorCard: React.FC<AuthorCardProps> = (props) => {
    const {role} = useAppSelector(state => state.user)
    const dispatch = useAppDispatch()
    const axiosInstance = useAxiosPrivate()
    const navigate = useNavigate()

    const sendMessage = (userId: string) => {
        dispatch(accessChatByUser({
            paramsId: userId,
            axiosInstance
        })).then(()=> {
            navigate(`/${role}/inbox`)
        })
    }


    return (
        <div className="w-full lg:w-1/ bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="px-4 pt-4">
                <span className='text-light_primary_text dark:text-dark_primary_text text-lg md:text-xl lg:text-2xl font-semibold'>Author</span>
            </div>
            <div className="flex flex-col items-center pb-10">
                <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={props.user.profilePicture === "Not Available" ? imgNotFound : props.user.profilePicture } alt={`${props.user.fullname}'s image`} />
                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{props.user.fullname}</h5>
                <span className="text-sm text-gray-500 dark:text-gray-400">{props.user.profileTitle}</span>
                <div className="flex mt-4 space-x-3 md:mt-6">
                    {/* <PrimaryBtn btnText='View Profile' icon={<ImProfile />} /> */}
                    <OutlineBtn btnText='Send Message' onClick={()=> sendMessage(props.user.userId)} icon={<RiMessage3Line />} />
                </div>
            </div>
        </div>
    )
}

export default AuthorCard