import React from 'react'
import { Link } from "react-router-dom";
import bannerImg from "../../utils/assets/navbar-img.png"
import PrimaryBtn from '../../components/Button/PrimaryBtn'
import OutlineBtn from '../../components/Button/OutlineBtn'
import { motion } from 'framer-motion'

const PublicBanner: React.FC = () => {
    const bannerAnimation = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
    };

    const textAnimation = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    };

    const imageAnimation = {
        hidden: { opacity: 0, x: -100 },
        visible: { opacity: 1, x: 0 },
    };

    return (
        <div className='flex flex-col md:flex-row justify-around h-[750px] w-full'>
            <motion.div
                className='relative top-[12%] md:top-[20%] lg:top-[35%] md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] mx-5 lg:mx-0'
                initial='hidden'
                animate='visible'
                variants={bannerAnimation}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <motion.span
                    className='text-light_primary_text dark:text-dark_primary_text font-semibold sm:text-lg md:text-2xl font-mono'
                    variants={textAnimation}
                >
                    The New and Open
                </motion.span>
                <br />
                <motion.span
                    className='text-oedark dark:text-gray-300 font-semibold text-4xl md:text-5xl lg:text-6xl'
                    variants={textAnimation}
                >
                    Way Of Education
                </motion.span>
                <br />
                <div className='relative block lg:hidden'>
                    <img className='max-h-[80%]' src={bannerImg} alt='Online education' />
                </div>
                <div className='mb-7 md:mb-5 mt-0 md:mt-5'>
                    <motion.span
                        className='w-full text-light_secondary_text dark:text-fade_text'
                        variants={textAnimation}
                    >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Imperdiet massa tincidunt nunc pulvinar sapien et ligula ullamcorper malesuada. Et tortor at risus viverra adipiscing at in tellus integer. Sed vulputate mi sit amet. Mollis aliquam ut porttitor leo a diam sollicitudin tempor id.
                    </motion.span>
                </div>
                <div className='flex gap-5'>
                    <Link to={'/signup'}>
                        <motion.div variants={textAnimation}>
                            <PrimaryBtn btnText='Be a learner' />
                        </motion.div>
                    </Link>
                    <Link to={'/tutor/signup'}>
                        <motion.div variants={textAnimation}>
                            <OutlineBtn btnText='Be a tutor' />
                        </motion.div>
                    </Link>
                </div>
            </motion.div>
            <motion.div
                className='relative hidden lg:block top-[10%]'
                initial='hidden'
                animate='visible'
                variants={imageAnimation}
                transition={{ duration: 0.8, delay: 0.2, ease: 'easeInOut'  }}
            >
                <img className='max-h-[80%]' src={bannerImg} alt='Online education' />
            </motion.div>
        </div>
    );
};

export default PublicBanner;
