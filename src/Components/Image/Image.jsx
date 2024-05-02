import React from 'react';

function Image({ image, toggleImageSelection, selectedImages, selectImages, incorrectSelection = [] }) {
    return (
        <div
            key={image.id}
            className={`image-container  p-1 ${incorrectSelection.some((e) => e.id === image.id) ? 'opacity-20 bg-cred' : 'bg-gray-200'}`}
            onClick={() => toggleImageSelection(image)}
        >
            <input
                type='checkbox'
                className='custom-checkbox absolute top-0 right-0 m-2 z-10'
                checked={selectedImages.id === image.id}
                readOnly
                style={{ display: selectImages ? 'block' : 'none' }}
            />
            <img src={image.url} alt={image.title} />
        </div>
    );
}

export default Image;
