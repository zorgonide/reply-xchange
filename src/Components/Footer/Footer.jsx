import React from 'react';

function Footer() {
    return (
        <div className='bg-gray-400 text-white fixed p-4 bottom-0 left-0 right-0 z-50'>
            <div className='flex justify-end'>
                <button className='px-4 py-2 border border-transparent shadow-md text-md font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
                    Share
                </button>
            </div>
        </div>
    );
}

export default Footer;
