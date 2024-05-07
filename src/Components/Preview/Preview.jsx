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
    function ImageToPrint(source) {
        return (
            '<html><head><script>function step1(){setTimeout("step2()", 10);}</script>' +
            '<script>function step2(){window.print();window.close();}</script></head>' +
            '<body onload="step1()" >' +
            '<img src="' +
            source +
            '" style="border: 5px solid #f91351;"/></body></html> '
        );
    }

    function PrintImage(source) {
        var Pagelink = 'about:blank';
        var pwa = window.open(Pagelink, '_new');
        pwa.document.open();
        pwa.document.write(ImageToPrint(source));
        pwa.document.close();
    }
    return (
        <div
            className='fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50'
            id='image-preview-modal'
            onClick={handleClickOutside}
        >
            <div className='flex justify-center items-center h-full'>
                <div className='relative mx-auto p-5 max-w-4xl max-h-full bg-white rounded-md shadow-lg'>
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
                        <img src={image.url} alt='Preview' className='mx-auto' style={{ maxHeight: '70vh' }} />
                    </div>
                    <div className='print-section flex justify-center mt-4'>
                        <button className='bg-cred font-bold uppercase text-white p-2 rounded-md' onClick={() => PrintImage(image.url)}>
                            Print
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Preview;
