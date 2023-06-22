import React from 'react';
import PublicNavbar from '../../containers/Navbars/PublicNavbar';
import PublicBanner from '../../containers/Banners/PublicBanner';
import Testimonials from '../../components/Card/Testimonials';
import { motion, useScroll, useTransform } from 'framer-motion';
import Timeline from '../../containers/Sections/Timeline';
import PublicCourseListing from '../../containers/Sections/PublicCourseListing';


const Home: React.FC = () => {
    const { scrollYProgress } = useScroll()
    const yPosTestimonials = useTransform(scrollYProgress, [0, 0.3], ['100%', '0%']);
    const yPosTimeline = useTransform(scrollYProgress, [0, 0.8], ['100%', '0%']);
    const yPosPublicCourseListing = useTransform(scrollYProgress, [0, 1.3], ['100%', '0%']);
    const opacity = useTransform(scrollYProgress, [1.2, 1], [0, 1],);

    return (
        <div>
            <PublicNavbar />
            <PublicBanner />
            <motion.div
                className='relative mt-20 md:mt-80 lg:mt-[-100px] mx-5 md:mx-10 lg:mx-28'
                style={{ position: 'relative', opacity, y: yPosTestimonials }}
            >
                <Testimonials />
            </motion.div>
            <motion.div
                className='relative mt-10 md:mt-24 lg:mt-0 mx-5 md:mx-10 lg:mx-28 mb-5'
                style={{ position: 'relative', opacity, y: yPosTimeline }}
            >
                <Timeline />
            </motion.div>
            <motion.div
                className='relative mt-[-20px] md:mt-8 mx-5 md:mx-10 lg:mx-28 mb-40'
                style={{ position: 'relative', opacity, y: yPosPublicCourseListing }}
            >
                <PublicCourseListing />
            </motion.div>
        </div>
    );
};

export default Home;
