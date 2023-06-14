import React from 'react'
import { Link } from "react-router-dom";
import bannerImg from "../../utils/assets/navbar-img.png"
import PrimaryBtn from '../../components/Button/PrimaryBtn'
import OutlineBtn from '../../components/Button/OutlineBtn'

const PublicBanner: React.FC = () => {

    return (
        <div className='flex justify-around h-[750px] w-full'>
            <div className='relative top-[35%] md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%]'>
                <span className='text-light_primary_text dark:text-dark_primary_text font-semibold text-2xl font-mono'>The New and Open</span> <br />
                <span className='text-oedark dark:text-gray-300 font-semibold text-6xl'>Way Of Education</span> <br />
                <div className='my-5'>
                    <span className='w-full text-light_secondary_text dark:text-fade_text'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Imperdiet massa tincidunt nunc pulvinar sapien et ligula ullamcorper malesuada. Et tortor at risus viverra adipiscing at in tellus integer. Sed vulputate mi sit amet. Mollis aliquam ut porttitor leo a diam sollicitudin tempor id.</span>
                </div>
                <div className='flex gap-5'>
                    <Link to={'/signup'}>
                        <PrimaryBtn btnText='Be a learner' />
                    </Link>
                    <Link to={'/tutor/signup'}>
                        <OutlineBtn btnText='Be a tutor' />
                    </Link>
                </div>
            </div>
            <div className='relative top-[10%] '>
                <img className='max-h-[80%]' src={bannerImg} alt="Online education" />
            </div>
        </div>
    )
}

export default PublicBanner