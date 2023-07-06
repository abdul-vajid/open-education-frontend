import React, { useEffect, useState } from 'react'
import UserSidebar from '../../../containers/Navbars/UserSidebar'
import UserNavBar from '../../../containers/Navbars/UserNavBar'
import { useAppDispatch } from '../../../app/hooks/storeHooks'
import { getWishlist } from './wishlistSlice'
import useAxiosPrivate from '../../../app/hooks/useAxiosPrivate'
import WishListListing from '../../../containers/Sections/common/WishListListing'

const Wishlist: React.FC = () => {
    const [sideMenu, setSideMenu] = useState(false)
    const dispatch = useAppDispatch()
    const axiosInstance = useAxiosPrivate()

    useEffect(() => {
        dispatch((getWishlist(axiosInstance)));
    }, [])

    return (
        <div className="overflow-auto">
            <UserNavBar sideMenuController={() => setSideMenu(!sideMenu)} />
            <UserSidebar sideMenu={sideMenu} />
            <div className="p-5 mt-20 md:ml-64 gap-5 lg:gap-5" onClick={() => { setSideMenu(true) }}>
                <WishListListing />
            </div>

        </div>
    )
}

export default Wishlist