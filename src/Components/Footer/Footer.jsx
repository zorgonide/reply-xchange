import axios from 'axios';
import React, { useState } from 'react';

function Footer({ images }) {
    const [showModal, setShowModal] = useState(false);
    const [email, setEmail] = useState('ammar.khurshid13@gmail.com');
    const [name, setName] = useState('Ammar');
    const [isLoading, setIsLoading] = useState(false);

    const sendEmail = async () => {
        setIsLoading(true);
        // let image = await fetch(images[0].url).then((r) => r.blob());
        let image = await axios
            .get(images[0].url, {
                headers: {
                    Authorization: 'Basic YWRtaW46YWRtaW4=',
                },
            })
            .then((r) => r.blob());
        // image = image.blob();
        const data = {
            service_id: `${process.env.REACT_APP_SERVICE_ID}`,
            template_id: `${process.env.REACT_APP_TEMPLATE_ID}`,
            user_id: `${process.env.REACT_APP_USER_ID}`,
            template_params: {
                from_name: 'Ammar Khurshid',
                to_name: name,
                message: 'Hi there',
                to_email: email,
                reply_to: 'a.khurshid@reply.com',
                image: image,
            },
        };

        axios
            .post('https://api.emailjs.com/api/v1.0/email/send', data)
            .then(() => {
                // alert('Your mail is sent!');
                setShowModal(false);
            })
            .catch((error) => {
                alert('Oops... ' + error.message);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <>
            <div className='bg-gray-400 text-white fixed p-4 bottom-0 left-0 right-0 z-50'>
                <div className='flex justify-end'>
                    <button
                        onClick={() => setShowModal(true)}
                        className='px-4 py-2 border border-transparent shadow-md text-md font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                    >
                        Share
                    </button>
                </div>
            </div>
            {showModal && (
                <div className='fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full' id='my-modal'>
                    <div className='relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white'>
                        <h3 className='text-lg font-medium leading-6 text-gray-900'>Send Email</h3>
                        {isLoading ? ( // Check if loading
                            <div className='flex justify-center items-center'>
                                <div className='loader'>Sending...</div>
                            </div>
                        ) : (
                            <form className='bg-white rounded px-8 pt-6 pb-8 mb-4'>
                                <div className='mb-4'>
                                    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='name'>
                                        Name
                                    </label>
                                    <input
                                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                        id='name'
                                        type='text'
                                        placeholder='Name'
                                        onChange={(e) => setName(e.target.value)}
                                        value={name}
                                    />
                                </div>
                                <div className='mb-4'>
                                    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='email'>
                                        Email
                                    </label>
                                    <input
                                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                        id='email'
                                        type='email'
                                        placeholder='example@example.com'
                                        onChange={(e) => setEmail(e.target.value)}
                                        value={email}
                                    />
                                </div>
                                <div className='flex items-center justify-between'>
                                    <button
                                        className='px-4 py-2 border border-transparent shadow-md text-md font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                                        type='button'
                                        onClick={sendEmail}
                                    >
                                        Send
                                    </button>
                                    <button
                                        className='bg-transparent hover:bg-gray-500 text-gray-700 font-semibold hover:text-white py-2 px-4 border border-gray-500 hover:border-transparent rounded'
                                        type='button'
                                        onClick={() => setShowModal(false)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

export default Footer;
