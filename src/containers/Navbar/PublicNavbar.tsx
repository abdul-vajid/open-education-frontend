import React from 'react'
import PrimaryBtn from '../../components/Button/PrimaryBtn'
import PrimaryLogo from '../../components/Logo/PrimaryLogo';
import SearchField from '../../components/InputFiled/SearchField';
import ThemeSettings from '../../features/theme/ThemeSettings';

const PublicNavbar: React.FC = () => {
    const handleClick = () => {
        console.log('Button clicked!');
    };

    return (
        <div className='flex items-center justify-between p-4 z-[100] w-full absolute'>
            <PrimaryLogo />
            <ThemeSettings />
            <div className='hidden md:block'>
                <div className='flex gap-5 items-center'>
                    <SearchField/>
                    <PrimaryBtn onClick={handleClick} btnText="Get Started" />
                </div>
            </div>
        </div>
    )
}

export default PublicNavbar