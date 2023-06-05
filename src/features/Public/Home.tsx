import React from 'react'
import PublicNavbar from '../../containers/Navbar/PublicNavbar'
import PublicBanner from '../../containers/Banner/PublicBanner'


const Home: React.FC = () => {
    return (
        <>
            <PublicNavbar />
            <PublicBanner />
        </>
    )
}

export default Home