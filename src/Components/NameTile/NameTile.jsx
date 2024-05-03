import axios from 'axios';
import React, { useEffect, useState } from 'react';

function NameTile({ username, routeChange, cat }) {
    return (
        <div
            key={username}
            className='cursor-pointer bg-white min-h-48 font-semibold  border  shadow-sm text-cred text-center hover:bg-gray-50 flex flex-col'
            onClick={() => routeChange(username)}
        >
            {cat ? <img src={cat} alt='cat' className='rounded-none h-40 ' /> : null}
            <p className='my-2 text-lg order-last'>{username.replace(/[^a-zA-Z]/g, '')}</p>
        </div>
    );
}

export default NameTile;
