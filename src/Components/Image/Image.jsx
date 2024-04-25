import React from 'react';

function Image({ image, toggleImageSelection, selectedImages, selectImages }) {
    return (
        <div key={image.id} className='image-container bg-gray-200 p-1' onClick={() => toggleImageSelection(image)}>
            <input
                type='checkbox'
                className='custom-checkbox absolute top-0 right-0 m-2 z-10'
                checked={selectedImages.some((e) => e.id === image.id)}
                readOnly
                style={{ display: selectImages ? 'block' : 'none' }}
            />
            <img src={image.url} alt={image.title} />
        </div>
    );
}

export default Image;
