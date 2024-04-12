import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';

function Header() {
    return (
        <header className='bg-gray-400 text-white px-4 top-0 left-0 right-0 z-50'>
            <nav className='flex justify-between items-center'>
                <ul className='flex justify-start space-x-4'>
                    <li>
                        <Link to='/'>Upload</Link>
                    </li>
                    <li>
                        <Link to='/gallery'>Gallery</Link>
                    </li>
                </ul>
                <div className=''>
                    <img src={logo} alt='logo' className='h-12 md:h-16' />
                </div>
            </nav>
        </header>
    );
}

export default Header;
