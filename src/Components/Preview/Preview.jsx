import React, { useCallback, useEffect, useState } from 'react';
// add print and download icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrint, faDownload } from '@fortawesome/free-solid-svg-icons';

function Preview({ image, onClose, OAuthCode }) {
    const [accessToken, setAccessToken] = useState(null);

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

    const handleDownload = (source) => {
        const link = document.createElement('a');
        link.href = source;
        link.download = 'image.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleLinkedInAuth = () => {
        if (!OAuthCode) {
            const clientId = process.env.REACT_APP_LINKEDIN_CLIENT_ID;
            const redirectUri = encodeURIComponent('http://localhost:3000/gallery');
            const linkedInAuthUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=w_member_social`;

            window.location.href = linkedInAuthUrl;
        } else {
            handleAccessToken(OAuthCode);
        }
    };

    const handleAccessToken = (code) => {
        const url = 'https://www.linkedin.com/oauth/v2/accessToken';
        const params = new URLSearchParams();
        params.append('grant_type', 'authorization_code');
        params.append('code', code);
        params.append('redirect_uri', 'http://localhost:3000/gallery');
        params.append('client_id', process.env.REACT_APP_LINKEDIN_CLIENT_ID);
        params.append('client_secret', process.env.REACT_APP_LINKEDIN_CLIENT_SECRET);

        fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded', mode: 'no-cors' },
            body: params.toString(),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.access_token) {
                    setAccessToken(data.access_token);
                }
            })
            .then(() => shareToLinkedIn())
            .catch((error) => console.error('Error fetching access token:', error));
    };

    const shareToLinkedIn = () => {
        if (!accessToken) {
            alert('You are not authenticated with LinkedIn. Please authenticate to continue.');
            return;
        }

        const apiURL = 'https://api.linkedin.com/v2/shares';
        const headers = {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        };
        const payload = {
            content: {
                contentEntities: [
                    {
                        entityLocation: image.url,
                        thumbnails: [
                            {
                                resolvedUrl: image.url,
                            },
                        ],
                    },
                ],
                title: 'Shared Image',
            },
            distribution: {
                linkedInDistributionTarget: {},
            },
            owner: 'urn:li:person:YOUR_PERSON_ID',
            text: {
                text: 'Check out this image!',
            },
        };

        fetch(apiURL, { method: 'POST', headers: headers, body: JSON.stringify(payload) })
            .then((response) => response.json())
            .then((data) => console.log('LinkedIn share response:', data))
            .catch((error) => console.error('Error sharing to LinkedIn:', error));
    };

    return (
        <div
            className='fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50'
            id='image-preview-modal'
            onClick={handleClickOutside}
        >
            <div className='flex justify-center items-center h-full'>
                <div className='relative mx-auto p-5 max-w-4xl max-h-full bg-white rounded-none shadow-lg'>
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
                        <img src={image.url} alt='Preview' className='mx-auto mt-5 rounded-none' style={{ maxHeight: '70vh' }} />
                    </div>
                    <div className='print-section flex justify-end mt-4'>
                        <button
                            className='bg-cred font-bold text-white px-3 py-2 rounded-md flex items-center mr-2'
                            onClick={() => PrintImage(image.url)}
                        >
                            <FontAwesomeIcon icon={faPrint} className='mr-2' />
                            Print
                        </button>
                        <button
                            className='bg-black font-bold text-white px-3 py-2 rounded-md flex items-center'
                            onClick={() => handleDownload(image.url)}
                        >
                            <FontAwesomeIcon icon={faDownload} className='mr-2' />
                            Download
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Preview;
