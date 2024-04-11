import React, { useState } from 'react';
import axios from 'axios';
function FileUploadCard() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [name, setName] = useState('');
    const [selectedOption, setSelectedOption] = useState('');
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    // Function to check name for irregular characters
    const checkName = (name) => {
        const regex = /^[a-zA-Z0-9_]*$/;
        return regex.test(name);
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
    const handleSubmit = (event) => {
        event.preventDefault();
        if (!selectedFile || !name || !checkName(name)) {
            return alert('Please fill required fields');
        }

        let data = new FormData();
        data.append('fileName', name);
        data.append('filePath', selectedFile);
        data.append('preset', selectedOption);

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            mode: 'no-cors',
            url: 'http://localhost:4502/bin/uploadasset',
            headers: {
                Authorization: 'Basic YWRtaW46YWRtaW4=',
            },
            data: data,
        };

        axios
            .request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
                console.log(error);
            });
    };
    return (
        <div className='flex flex-col justify-center items-center h-screen'>
            <div className='bg-gray-200 p-4 w-2/6'>
                <div className='container mx-auto p-4 '>
                    <form onSubmit={handleSubmit} className='flex flex-col items-center'>
                        <label className='block mb-2 text-lg font-large'>Upload your photo</label>
                        <input
                            className='block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400'
                            id='file_input'
                            type='file'
                            onChange={handleFileChange}
                        />
                        <label htmlFor='name' className='block mt-2 text-sm font-medium text-gray-900 dark:text-gray-300'></label>
                        <input
                            type='text'
                            id='name'
                            name='name'
                            placeholder='Name'
                            className='block w-full text-md  bg-gray-50 border border-gray-300  focus:outline-none '
                            onChange={(e) => setName(e.target.value)}
                        />
                        <div className='flex flex-wrap justify-center gap-1 my-4'>
                            {options.map((option) => (
                                <button
                                    type='button'
                                    key={option}
                                    className={`px-4 py-2 rounded-full text-sm font-medium ${
                                        selectedOption === option ? 'bg-gray-500 text-white' : 'bg-gray-200 text-gray-800'
                                    } hover:bg-gray-400 hover:text-white transition-colors`}
                                    onClick={() => setSelectedOption(option)}
                                >
                                    {option.replace('-', ' ')}
                                </button>
                            ))}
                        </div>
                        <button
                            type='submit'
                            className='mt-2 px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                        >
                            Upload photo
                        </button>
                    </form>
                    {selectedFile && (
                        <div className='mt-4 flex flex-col items-center'>
                            <p>Filename: {selectedFile.name}</p>
                            <p>File type: {selectedFile.type}</p>
                            <p>Size: {(selectedFile.size / 1024 / 1024).toFixed(2)} mb</p>
                            <img src={URL.createObjectURL(selectedFile)} alt='Preview' className='rounded-lg mt-2' style={{ maxWidth: '300px' }} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
export default FileUploadCard;
