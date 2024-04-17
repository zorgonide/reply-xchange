import React, { useState } from 'react';
import axios from 'axios';

function FileUploadCard() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [name, setName] = useState('');
    const [selectedOption, setSelectedOption] = useState('');
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
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
        if (!selectedFile || !name || !checkName(name)) {
            alert('Please fill required fields');
            return;
        }

        let data = new FormData();
        data.append('fileName', name + '.png');
        data.append('filePath', selectedFile);
        data.append('preset', selectedOption);

        let config = {
            method: 'post',
            url: 'http://localhost:4502/bin/uploadasset',
            headers: { Authorization: 'Basic YWRtaW46YWRtaW4=' },
            data: data,
        };

        setIsUploading(true);
        axios
            .request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                setUploadSuccess(true);
                setSelectedFile(null);
                setName('');
                setSelectedOption('');
            })
            .catch((error) => {
                console.log(error);
                alert('Upload failed, please try again.');
            })
            .finally(() => {
                setIsUploading(false);
            });
    };

    const options = [
        '3d-model',
        'analog-film',
        'anime',
        'cinematic',
        'comic-book',
        'digital-art',
        'enhance',
        'fantasy-art',
        'isometric',
        'line-art',
        'low-poly',
        'modeling-compound',
        'neon-punk',
        'origami',
        'photographic',
        'pixel-art',
        'tile-texture',
    ];

    return (
        <div className='flex flex-col justify-center items-center h-screen bg-gray-50'>
            <div className='bg-white p-6 w-full max-w-md shadow-md rounded-lg'>
                <form onSubmit={handleSubmit} className='space-y-4'>
                    <div className='flex items-center justify-center w-ful'>
                        <label
                            htmlFor='dropzone-file'
                            className='flex flex-col items-center justify-center w-full h-34 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-100'
                        >
                            <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                                <svg className='w-8 h-8 mb-4 text-gray-600' aria-hidden='true' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
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
                            </div>
                            <input id='dropzone-file' type='file' className='hidden' onChange={handleFileChange} accept='image/png' />
                        </label>
                    </div>
                    {selectedFile && (
                        <div className='my-4 text-center'>
                            <p>Filename: {selectedFile.name}</p>
                            {/* <p>File type: {selectedFile.type}</p> */}
                            <p>Size: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                            <img src={URL.createObjectURL(selectedFile)} alt='Preview' className='mt-4 rounded-lg max-w-full h-auto' />
                        </div>
                    )}
                    <input
                        type='text'
                        name='name'
                        placeholder='Name'
                        value={name}
                        className='block w-full mt-1 pl-3 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                        onChange={(e) => setName(e.target.value)}
                    />
                    <div className='flex flex-wrap gap-2'>
                        {options.map((option) => (
                            <label
                                key={option}
                                className={`px-3 py-1 rounded-full text-sm font-medium cursor-pointer ${
                                    selectedOption === option ? 'bg-red-700 text-white' : 'bg-gray-200 text-gray-800'
                                } hover:bg-red-700 hover:text-white transition-colors`}
                            >
                                <input
                                    type='radio'
                                    name='preset'
                                    value={option}
                                    checked={selectedOption === option}
                                    onChange={() => setSelectedOption(option)}
                                    className='sr-only'
                                />
                                {option.replace('-', ' ')}
                            </label>
                        ))}
                    </div>
                    <button
                        type='submit'
                        className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
                        style={{ backgroundColor: selectedFile ? '#E11D48' : '#D1D5DB' }}
                    >
                        Upload photo
                    </button>
                    {uploadSuccess && <p className='text-green-500'>File uploaded successfully!</p>}
                </form>
            </div>
        </div>
    );
}

export default FileUploadCard;
