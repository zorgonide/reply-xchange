import React, { useCallback, useEffect } from 'react';

function Preview({ image, onClose }) {
    const handleKeyUp = useCallback(
        (event) => {
            if (event.key === 'Escape') {
                onClose(); // Assuming onClose prop is a function to handle closing the modal
            }
        },
        [onClose]
    );

    useEffect(() => {
        window.addEventListener('keyup', handleKeyUp);
        return () => {
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [handleKeyUp]);

    if (!image || !image.url) return null;

    const handleClickOutside = (event) => {
        if (event.target.id === 'image-preview-modal') {
            onClose();
        }
    };

    return (
        <div
            className='fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50'
            id='image-preview-modal'
            onClick={handleClickOutside}
        >
            <div className='flex justify-center items-center h-full'>
                <div className='relative mx-auto p-5 max-w-4xl max-h-full bg-white rounded-md shadow-lg'>
                    <h3 className='text-lg font-medium leading-6 text-gray-900 mb-4'>Image Preview</h3>
                    <button onClick={onClose} className='absolute top-0 right-0 mt-4 mr-4 text-gray-700 hover:text-gray-900' aria-label='Close'>
                        <svg
                            className='w-6 h-6'
                            fill='none'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                        >
                            <path d='M6 18L18 6M6 6l12 12'></path>
                        </svg>
                    </button>
                    <div className='overflow-auto'>
                        <img src={image.url} alt='Preview' className='mx-auto' style={{ maxHeight: '80vh' }} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Preview;
