import React, { useState } from 'react';
import axios from 'axios';
import Drawing from '../../assets/drawing.svg';
function FileUploadCard() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [name, setName] = useState('');
    const [selectedOption, setSelectedOption] = useState('');
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const handleFileChange = (event) => {
        if (event.target.files[0]?.type !== 'image/png') {
            alert('Please upload a PNG file');
            return;
        }
        setSelectedFile(event.target.files[0]);
    };

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

        let data = new FormData();
        data.append('username', name.replace(/\s+/g, ''));
        data.append('file', selectedFile);
        // data.append('preset', selectedOption);

        let config = {
            method: 'post',
            url: 'http://localhost:4502/bin/checkusername?username=' + name.replace(/\s+/g, ''),
            headers: { Authorization: 'Basic YWRtaW46YWRtaW4=' },
        };

        axios
            .request(config)
            .then((response) => response.data)
            .then((response) => {
                console.log(JSON.stringify(response));
                setUploadSuccess(true);
                setSelectedFile(null);
                setName('');
                setSelectedOption('');
            })
            .then(() => {
                axios
                    .post('http://localhost:4502/bin/uploadAsset', data, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            Authorization: 'Basic YWRtaW46YWRtaW4=',
                        },
                        data: data,
                    })
                    .then((response) => {
                        console.log(response);
                        alert('Upload successful');
                    });
            })
            .catch((error) => {
                console.log(error);
                alert('Upload failed, please try again.');
            });
    };

    return (
        <div className='flex flex-col justify-center items-center h-screen bg-gray-50'>
            <div className='bg-white p-6 w-full max-w-md shadow-md rounded-lg'>
                <form onSubmit={handleSubmit} className='space-y-4'>
                    <div className='flex items-center justify-center w-ful'>
                        <label
                            htmlFor='dropzone-file'
                            className='flex flex-col items-center justify-center w-full h-34 border-2 border-cred border-dashed rounded-lg cursor-pointer hover:bg-gray-100'
                        >
                            <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                                {!selectedFile && (
                                    <>
                                        <svg
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
                                        </svg>
                                        <p className='mb-2 text-sm text-gray-700'>
                                            <span className='font-semibold'>Click to upload</span> or drag and drop
                                        </p>
                                        <p className='text-xs text-gray-500'>Only PNG files</p>
                                    </>
                                )}
                                {selectedFile && (
                                    <div className='px-4'>
                                        <img src={Drawing} alt='Preview' className='mt-4 rounded-lg max-w-full h-auto' />
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
                    {uploadSuccess && <p className='text-center text-green-500'>username checked successfully!</p>}
                </form>
            </div>
        </div>
    );
}

export default FileUploadCard;
