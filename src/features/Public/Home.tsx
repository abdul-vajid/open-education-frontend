import React from 'react'
import PublicNavbar from '../../containers/Navbars/PublicNavbar'
import PublicBanner from '../../containers/Banners/PublicBanner'


const Home: React.FC = () => {
    return (
        <>
            <PublicNavbar />
            <PublicBanner />
            <div>
            </div>
        </>
    )
}

export default Home