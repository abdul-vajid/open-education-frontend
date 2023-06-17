import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks/storeHooks'
import { setDarkTheme, setLightTheme } from '../../features/theme/themeSlice'
import useAxiosPrivate from '../../app/hooks/useAxiosPrivate'
import { clearLoggedUserData, getUserProfile, setLoggedUserData } from '../../features/users/Common/userSlice'
import useLogout from '../../app/hooks/useLogout'

const UserDropDown: React.FC = () => {
    const { email, fullname } = useAppSelector(state => state.user)
    const { currentTheme } = useAppSelector(state => state.theme)
    const dispatch = useAppDispatch()
    // const axios = useAxiosPrivate()
    const axiosInstance = useAxiosPrivate()
    const logout = useLogout()

    const handleTheme = (e: any) => {
        if (e.value === 'checked' || currentTheme === "light") {
            dispatch(setDarkTheme())
        } else if (e.value !== "checked" || currentTheme === "dark") {
            dispatch(setLightTheme())
        }
    }

    useEffect(() => {
        dispatch(getUserProfile(axiosInstance)).then((action) => {
            if (action.payload.status === "rejected") {
                dispatch(clearLoggedUserData())
            }
        }).catch(() => {
            dispatch(clearLoggedUserData())
        })
    }, [])

    // const fetchUserDetails = () => {
    //     axios
    //         .get("user/get-user")
    //         .then((res) => {
    //             if (res?.data?.success) dispatch(setLoggedUserData(res?.data?.data));
    //         })
    //         .catch(() => {
    //             dispatch(clearLoggedUserData())
    //         })
    // };

    // useEffect(() => {
    //     fetchUserDetails()
    // }, [])


    return (
        <div className="fixed top-12 right-6 z-50 my-4 pr-2 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600" id="dropdown-user">
            <div className="px-4 py-3" role="none">
                <p className="text-sm text-gray-900 dark:text-white" role="none">
                    {fullname}
                </p>
                <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300" role="none">
                    {email}
                </p>
            </div>
            <ul className="py-1" role="none">
                <li>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Notifications</a>
                </li>
                <li>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Wallet</a>
                </li>
                <li>
                    <div className='flex'>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Dark mode</a>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" value="" onChange={(e) => handleTheme(e)} className="sr-only peer" checked={currentTheme === 'dark' ? true : false} />
                            <div className="w-8 h-3 bg-gray-200 outline-none ring-2 ring-blue-300 dark:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[8px] after:left-[-4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                    </div>
                </li>
                <li>
                    <a href='#' className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => logout()} role="menuitem">Sign out</a>
                </li>
            </ul>
        </div>
    )
}

export default UserDropDown