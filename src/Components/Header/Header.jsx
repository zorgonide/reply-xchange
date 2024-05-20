import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import Xchange from '../../assets/xchange.png';
// import game icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhotoFilm } from '@fortawesome/free-solid-svg-icons';
function Header() {
    return (
        <header className='bg-cred text-lg text-white px-4 top-0 left-0 right-0 z-50'>
            <nav className='flex items-center gap-7 relative'>
                <div>
                    <img src={logo} alt='logo' className='h-16 w-auto' />
                </div>
                <ul className='flex space-x-4'>
                    <li>
                        <Link to='/'>Upload</Link>
                    </li>
                    <li>
                        <Link to='/gallery'>Gallery</Link>
                    </li>
                    <li>
                        <Link
                            to='/game'
                            className='font-mono font-semibold bg-white text-cred rounded p-2 hover:bg-cred hover:text-white transition-all duration-500'
                        >
                            <FontAwesomeIcon icon={faPhotoFilm} className='mr-2' />
                            Play!
                        </Link>
                    </li>
                </ul>
                <div className='absolute right-0 top-2'>
                    <img src={Xchange} alt='xchange' className='h-32 w-auto' />
                </div>
            </nav>
        </header>
    );
}

export default Header;
