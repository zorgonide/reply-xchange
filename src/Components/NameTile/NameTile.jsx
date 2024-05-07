import React from 'react';

function NameTile({ username, routeChange, index }) {
    const imageUrl = require(`../../assets/stickers/cat${(index + 1) % 60}.png`);

    return (
        <div
            key={username}
            className='cursor-pointer bg-white min-h-64 font-semibold border shadow-sm text-cred text-center hover:bg-gray-50 flex flex-col p-2'
            onClick={() => routeChange(username)}
        >
            <img key={index} src={imageUrl} alt={`Sticker ${(index + 1) % 60}`} className='object-contain rounded-none h-56' />
            <p className='my-2 text-xl order-last font-mono'>{username.replace(/[^a-zA-Z]/g, '')}</p>
        </div>
    );
}

export default NameTile;
