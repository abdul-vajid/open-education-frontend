import React from 'react'
import PrimaryBtn from '../Button/PrimaryBtn'
import OutlineBtn from '../Button/OutlineBtn'
import { RiMessage3Line } from "react-icons/ri"
import { ImProfile } from "react-icons/im"
import imgNotFound from "../../utils/assets/image-not-found.png"

type AuthorCardProps = {
    name: string,
    picture: string,
    profileTitle: string,
    primaryOnClick?: () => void
    outlineOnClick?: () => void
}


const AuthorCard: React.FC<AuthorCardProps> = (props) => {
    console.log("dp", props.picture)
    return (
        <div className="w-full lg:w-1/ bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="px-4 pt-4">
                <span className='text-light_primary_text dark:text-dark_primary_text text-lg md:text-xl lg:text-2xl font-semibold'>Author</span>
            </div>
            <div className="flex flex-col items-center pb-10">
                <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={props.picture === "Not Available" ? imgNotFound : props.picture } alt={`${props.name}'s image`} />
                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{props.name}</h5>
                <span className="text-sm text-gray-500 dark:text-gray-400">{props.profileTitle}</span>
                <div className="flex mt-4 space-x-3 md:mt-6">
                    <PrimaryBtn btnText='View Profile' icon={<ImProfile />} />
                    <OutlineBtn btnText='Message' icon={<RiMessage3Line />} />
                </div>
            </div>
        </div>
    )
}

export default AuthorCard