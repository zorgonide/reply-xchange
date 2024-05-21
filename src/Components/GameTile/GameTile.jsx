import React from 'react';

function GameTile({ image, toggleImageSelection, selectedImages, index, incorrectSelection = [], name, didWin = false }) {
    return (
        <div
            key={image.id}
            className={`w-full h-full ease-in duration-100 cursor-pointer hover:scale-[1.02] ${
                incorrectSelection.some((e) => e.id === image.id) ? 'opacity-20 bg-cred' : 'bg-gray-200'
            }
    ${selectedImages.id === image.id ? 'border-4 border-cred' : 'border-2 border-gray-400'}
    ${didWin & (selectedImages.id === image.id) ? 'border-cgreen' : ''}`}
            onClick={() => toggleImageSelection(image)}
        >
            <img src={image.url} alt={image.title} className='rounded-none' />
        </div>
    );
}

export default GameTile;
