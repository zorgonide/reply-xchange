import React from 'react';

function Image({ image, toggleImageSelection, selectedImages, index, incorrectSelection = [] }) {
    return (
        <div
            key={image.id}
            className={`image-container-polaroid mx-auto cursor-pointer ${
                incorrectSelection.some((e) => e.id === image.id) ? 'opacity-20 bg-cred' : 'bg-gray-200'
            }
            ${selectedImages.id === image.id ? 'border-4 border-cred' : 'border-2 border-gray-400'}`}
            onClick={() => toggleImageSelection(image)}
        >
            <div className='image-cover'>
                <div className='gloss'>
                    <img src={image.url} alt={image.title} className='rounded-none' />
                </div>
            </div>
            <p className='text-center my-4'>Photo #{index + 1}</p>
        </div>
    );
}

export default Image;
