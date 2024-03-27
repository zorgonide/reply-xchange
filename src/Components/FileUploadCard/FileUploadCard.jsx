import React, { useState } from 'react';
import axios from 'axios';
function FileUploadCard() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [name, setName] = useState('');
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!selectedFile || !name) {
            return alert('Please fill required fields');
        }

        let data = new FormData();
        data.append('fileName', name);
        data.append('filePath', selectedFile);

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
        <div className='container mx-auto p-4'>
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
                <button
                    type='submit'
                    className='mt-2 px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                >
                    Upload photo
                </button>
            </form>
            {selectedFile && (
                <div className='mt-4'>
                    <p>Filename: {selectedFile.name}</p>
                    <p>File type: {selectedFile.type}</p>
                    <p>Size: {(selectedFile.size / 1024 / 1024).toFixed(2)} mb</p>
                    <img src={URL.createObjectURL(selectedFile)} alt='Preview' className='rounded-lg mt-2' style={{ maxWidth: '300px' }} />
                </div>
            )}
        </div>
    );
}
export default FileUploadCard;
