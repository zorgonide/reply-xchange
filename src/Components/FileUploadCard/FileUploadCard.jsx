import React, { useState } from 'react';
// const DirectBinary = require('@adobe/aem-upload');
function FileUploadCard() {
    const [selectedFile, setSelectedFile] = useState(null);
    // const targetUrl = 'http://localhost:4502/content/dam/target';
    // const uploadFiles = [
    //     {
    //         fileName: 'test', // name of the file as it will appear in AEM
    //         fileSize: 1024, // total size, in bytes, of the file
    //         filePath: URL.createObjectURL(selectedFile), // Full path to the local file
    //     },
    // ];

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSubmit = (event) => {
        // event.preventDefault();
        // const upload = new DirectBinary.DirectBinaryUpload();
        // const options = new DirectBinary.DirectBinaryUploadOptions().withUrl(targetUrl).withUploadFiles(uploadFiles);
        // upload
        //     .uploadFiles(options)
        //     .then((result) => {
        //         console.log(result);
        //         // "result" contains various information about the upload process, including
        //         // performance metrics and errors that may have occurred for individual files
        //         // at this point, assuming no errors, there will be two new assets in AEM:
        //         //  http://localhost:4502/content/dam/target/file1.jpg
        //         //  http://localhost:4502/content/dam/target/file2.jpg
        //     })
        //     .catch((err) => {
        //         console.error(err);
        //         // the Promise will reject if something causes the upload process to fail at
        //         // a high level. Note that individual file failures will NOT trigger this
        //         // "err" will be an instance of UploadError. See "Error Handling"
        //         // for more information
        //     });
        // // Perform the upload to the server or Firebase Storage
        // // using the selectedFile
    };
    return (
        <div className='container mx-auto p-4'>
            <form onSubmit={handleSubmit} className='flex flex-col items-center'>
                <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'>Upload your photo</label>
                <input
                    className='block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400'
                    id='file_input'
                    type='file'
                    onChange={handleFileChange}
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
                    <p>Size: {selectedFile.size} bytes</p>
                    <img src={URL.createObjectURL(selectedFile)} alt='Preview' className='rounded-lg mt-2' style={{ maxWidth: '300px' }} />
                </div>
            )}
        </div>
    );
}

export default FileUploadCard;
