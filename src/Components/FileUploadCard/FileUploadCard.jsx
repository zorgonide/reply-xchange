import React, { useState } from 'react';
import axios from 'axios';
import Cat from '../../assets/cat.gif';
import Artist from '../../assets/drawing.svg';
import { useNavigate } from 'react-router-dom';
function FileUploadCard() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [name, setName] = useState('');
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };
    let navigate = useNavigate();

    const checkName = (name) => {
        const regex = /^[a-zA-Z0-9_]*$/;
        return regex.test(name);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setUploadSuccess(false);

        if (!selectedFile || !name || !checkName(name)) {
            alert('Please fill required fields');
            return;
        }
        let uniqueName = name.replace(/\s+/g, '') + Math.floor(Math.random() * 101);

        let data = new FormData();
        data.append('username', uniqueName);
        data.append('file', selectedFile);

        axios
            .post('http://localhost:4502/bin/checkUsername?username=' + uniqueName, null, {
                headers: { Authorization: 'Basic YWRtaW46YWRtaW4=' },
            })
            .then((response) => response.data)
            .then(() => {
                setUploadSuccess('Username checked... uploading file...');
            })
            .then(() => {
                axios
                    .post('http://localhost:4502/bin/uploadAsset', data, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            Authorization: 'Basic YWRtaW46YWRtaW4=',
                        },
                    })
                    .then(() => {
                        setUploadSuccess('Upload successful!');
                        setSelectedFile(null);
                        setName('');
                        navigate('game');
                    });
            })
            .catch((error) => {
                console.log(error);
                alert('Upload failed, please try again.');
            });
    };

    return (
        <div className='flex flex-col justify-center items-center h-screen bg-gray-50'>
            <div className='bg-white p-6 w-full max-w-lg shadow-md rounded-lg'>
                <p className='text-center font-semibold text-xl text-cred mb-3'>Comwrap Clash: Artist or Algorithm</p>
                <p className='text-center text-md font-light text-gray-700 mb-3'>Can you tell what is real?</p>
                <form onSubmit={handleSubmit} className='space-y-4'>
                    <div className='flex items-center justify-center w-ful'>
                        <label
                            htmlFor='dropzone-file'
                            className={`flex flex-col items-center justify-center w-full h-34 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-100 ${
                                selectedFile ? 'border-cred' : 'border-gray-300'
                            }`}
                        >
                            <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                                {!selectedFile && (
                                    <>
                                        <div className='px-4'>
                                            <img src={Artist} alt='Preview' className='my-4 rounded-lg max-w-full h-auto' />
                                        </div>
                                        {/* <svg
                                            className='w-8 h-8 mb-4 text-gray-600'
                                            aria-hidden='true'
                                            fill='none'
                                            viewBox='0 0 24 24'
                                            stroke='currentColor'
                                        >
                                            <path
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                                strokeWidth={2}
                                                d='M7 7l5-5m0 0l5 5m-5-5v18M5 10v10a2 2 0 002 2h10a2 2 0 002-2V10M9 21h6'
                                            />
                                        </svg> */}
                                        <p className='mb-2 text-sm text-gray-700'>
                                            <span className='font-semibold'>Click to upload</span> or drag and drop
                                        </p>
                                        <p className='text-xs text-gray-500'>Only PNG files</p>
                                    </>
                                )}
                                {selectedFile && (
                                    <div className='px-4'>
                                        <img src={Cat} alt='Preview' className='mt-4 rounded-lg max-w-full h-auto' />
                                    </div>
                                )}
                            </div>
                            <input id='dropzone-file' type='file' className='hidden' onChange={handleFileChange} accept='image/png' />
                        </label>
                    </div>
                    <input
                        type='text'
                        name='name'
                        placeholder='Name'
                        value={name}
                        className='block w-full mt-1 pl-3 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-cred'
                        onChange={(e) => setName(e.target.value)}
                    />
                    <button
                        type='submit'
                        className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none  ${
                            selectedFile && name ? 'bg-cred hover:bg-red-700 focus:ring-2 focus:ring-offset-2 focus:ring-red-500' : 'bg-gray-400'
                        }`}
                        disabled={!selectedFile || !name}
                    >
                        Upload photo
                    </button>
                    {uploadSuccess && <p className='text-center text-green-500'>{uploadSuccess}</p>}
                </form>
            </div>
        </div>
    );
}

export default FileUploadCard;
