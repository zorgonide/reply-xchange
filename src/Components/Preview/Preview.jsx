import React, { useCallback, useEffect } from 'react';
import { useLinkedIn } from 'react-linkedin-login-oauth2';
// You can use provided image shipped by this package or using your own
import linkedin from 'react-linkedin-login-oauth2/assets/linkedin.png';
function Preview({ image, onClose }) {
    const handleKeyUp = useCallback(
        (event) => {
            if (event.key === 'Escape') {
                onClose(); // Assuming onClose prop is a function to handle closing the modal
            }
        },
        [onClose]
    );
    const { linkedInLogin } = useLinkedIn({
        clientId: '78gcq4br7990pn',
        redirectUri: `https://delightful-belekoy-f92b90.netlify.app/gallery`, // for Next.js, you can use `${typeof window === 'object' && window.location.origin}/linkedin`
        onSuccess: (code) => {
            console.log(code);
        },
        onError: (error) => {
            console.log(error);
        },
    });

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
            '<html><head><style>' +
            'body { position: relative; }' +
            '#logo { position: absolute; top: 10px; right: 10px; max-width: 180px }' +
            '</style><script>function step1(){setTimeout("step2()", 10);}</script>' +
            '<script>function step2(){window.print();window.close();}</script></head>' +
            '<body onload="step1()">' +
            `<img id="logo" src="http://localhost:4502/content/dam/xchange/logopic.png"/>` +
            '<img src="' +
            source +
            '" style="border: 5px solid #f91351; display: block; margin: 0 auto;"/>' +
            '</body></html>'
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
                    <div className='print-section flex justify-end mt-4'>
                        <button className='bg-cred font-bold text-white p-2 rounded-md flex items-center' onClick={() => PrintImage(image.url)}>
                            <svg
                                className='w-5 h-5 mr-2'
                                fill='none'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2'
                                viewBox='0 0 24 24'
                                stroke='currentColor'
                            >
                                <path d='M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-6a2 2 0 012-2h16a2 2 0 012 2v6a2 2 0 01-2 2h-2'></path>
                                <path d='M6 14h12v8H6z'></path>
                                <path d='M8 14v4m8-4v4m-6 4v2m4-2v2'></path>
                            </svg>
                            Print
                        </button>
                        <img
                            onClick={linkedInLogin}
                            src={linkedin}
                            alt='Sign in with Linked In'
                            style={{ maxWidth: '240px', cursor: 'pointer', minHeight: '40px' }}
                            className='ml-4 '
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Preview;
