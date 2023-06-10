import React from 'react'
import { Link } from 'react-router-dom'
import { MdDashboard } from "react-icons/md";

type SideBarBtnProps = {
    BtnText: string,
    onClick?: () => {}
    linkPath: string
    isSelected?: boolean
    isProtag?: boolean
    isBadge?: boolean
    badgeText?: number
}

const SideBarBtn: React.FC<SideBarBtnProps> = ({ BtnText, onClick, linkPath, isSelected, isBadge, badgeText, isProtag }) => {
    let classNames = {
        button: "",
        span: "",
        proTag: "",
        badge: ""
    }
    switch (isSelected) {
        case true:
            classNames = {
                button: "w-full flex justify-between p-2 bg-light_primary dark:bg-dark_primary text-light_primary_btn_text dark:text-dark_primary_btn_text rounded-lg font-medium, hover:bg-light_primary dark:hover:bg-dark_primary",
                span: "",
                proTag: "",
                badge: ""
            }
            break;
        case false:
            classNames = {
                button: "w-full flex justify-between p-2 text-light_primary_text dark:text-dark_primary_text rounded-lg font-medium hover:text-light_primary_btn_text dark:hover:text-dark_primary_btn_text  hover:bg-light_primary dark:hover:bg-dark_primary ",
                span: "",
                proTag: "",
                badge: ""
            }
            break;
    }
    return (
        <li className='my-5'>
            <Link to={linkPath}>
                <button onClick={onClick} className={classNames.button}>
                {/* <button onClick={onClick} className=""> */}
                    <div className='inline-flex items-center'>
                        <MdDashboard className="text-xl transition duration-75 group-hover:text-gray-900 dark:group-hover:text-white" />
                        <span className="ml-3">{BtnText}</span>
                    </div>
                    {isProtag && !isBadge && <span className="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300">Pro</span>}
                    {!isProtag && isBadge && <span className="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">{badgeText ? badgeText : 0}</span>}
                </button>
            </Link>
        </li>
    )
}

export default SideBarBtn