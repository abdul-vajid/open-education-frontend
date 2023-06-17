import React, { useEffect, useState } from 'react'
import PrimaryBtn from '../../components/Button/PrimaryBtn'
import PrimaryLogo from '../../components/Logo/PrimaryLogo';
import { Link } from 'react-router-dom';

const PublicNavbar: React.FC = () => {
    const [menuVisibility, setMenuVisibility] = useState(false)

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setMenuVisibility(true);
            } else {
                setMenuVisibility(false);
            }
        };

        window.addEventListener('resize', handleResize);

        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <nav className="fixed w-full z-20 top-0 left-0">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="" className="flex items-center">
                    <PrimaryLogo />
                </a>
                <div className="flex md:order-2">
                    <Link to='/login'>
                        <PrimaryBtn btnText="Login" />
                    </Link>
                    <button onClick={() => setMenuVisibility(!menuVisibility)} type="button" className="ml-3 md:mr-0inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2  dark:text-gray-400 dark:hover:bg-gray-700" aria-controls="navbar-sticky" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
                    </button>
                </div>
                {
                    menuVisibility && <div className="items-center justify-between w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                        <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 bg-light_secondary_bg dark:bg-dark_secondary_bg md:bg-transparent dark:md:bg-transparent dark:border-gray-700">
                            <li>
                                <a href="#" className="block py-2 pl-3 pr-4 text-white bg-light_primary dark:bg-dark_primary rounded md:bg-transparent dark:md:bg-transparent md:text-light_primary md:dark:text-dark_primary md:p-0" aria-current="page">Home</a>
                            </li>
                            <li>
                                <a href="#" className="block py-2 pl-3 pr-4 text-gray-900 rounded md:hover:bg-transparent md:hover:text-light_primary md:p-0 md:dark:hover:text-dark_primary dark:text-white dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">About</a>
                            </li>
                            <li>
                                <a href="#" className="block py-2 pl-3 pr-4 text-gray-900 rounded md:hover:bg-transparent md:hover:text-light_primary md:p-0 md:dark:hover:text-dark_primary dark:text-white dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Services</a>
                            </li>
                            <li>
                                <a href="#" className="block py-2 pl-3 pr-4 text-gray-900 rounded md:hover:bg-transparent md:hover:text-light_primary md:p-0 md:dark:hover:text-dark_primary dark:text-white dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Contact</a>
                            </li>
                        </ul>
                    </div>
                }
            </div>
        </nav>

    )
}

export default PublicNavbar