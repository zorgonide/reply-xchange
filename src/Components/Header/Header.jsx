import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header className='bg-gray-500 text-white p-4 top-0 left-0 right-0 z-50'>
            <nav className='flex justify-between'>
                <ul className='flex justify-start space-x-4'>
                    <li>
                        <Link to='/'>Upload</Link>
                    </li>
                    <li>
                        <Link to='/gallery'>Gallery</Link>
                    </li>
                </ul>
                <div className='text-rose-600 text-xl'>Comwrap UK</div>
            </nav>
        </header>
    );
}

export default Header;
