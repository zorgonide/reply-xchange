import React, { useState, useEffect } from 'react';
import axios from 'axios';
function NameTile({ username, routeChange, index }) {
    const imageUrl = require(`../../assets/stickers/cat${(index + 1) % 60}.png`);
    const [image, setImage] = useState(null);
    const getImages = () => {
        axios
            .get('http://localhost:4502/bin/getAssets?username=' + username, {
                headers: {
                    Authorization: 'Basic YWRtaW46YWRtaW4=',
                },
            })
            .then((response) => response.data)
            .then((data) => {
                setImage(data[Math.floor(Math.random() * data.length)]);
            });
    };
    const addToGamePlayed = (username) => {
        if (localStorage.getItem('gamesPlayed')) {
            let gamesPlayed = JSON.parse(localStorage.getItem('gamesPlayed'));
            if (gamesPlayed.includes(username)) {
                return;
            }
            gamesPlayed.push(username);
            localStorage.setItem('gamesPlayed', JSON.stringify(gamesPlayed));
        } else {
            localStorage.setItem('gamesPlayed', JSON.stringify([username]));
        }
    };
    const checkForGamePlayed = (username) => {
        let gamesPlayed = localStorage.getItem('gamesPlayed');
        if (gamesPlayed) {
            gamesPlayed = JSON.parse(gamesPlayed);
            return gamesPlayed.includes(username);
        } else {
            return false;
        }
    };
    useEffect(() => {
        getImages();
    }, []);
    return (
        <div
            key={username}
            className='cursor-pointer bg-white min-h-64 font-semibold border shadow-sm text-cred text-center hover:bg-gray-50 flex flex-col'
            onClick={() => {
                addToGamePlayed(username);
                routeChange(username);
            }}
        >
            <img
                key={index}
                src={image?.url}
                alt={`Sticker ${(index + 1) % 60}`}
                className={`object-cover rounded-none h-56 ${!checkForGamePlayed(username) ? 'opacity-50' : ''}`}
            />
            <p className='my-2 text-xl order-last font-mono'>{username.replace(/[^a-zA-Z]/g, '')}</p>
        </div>
    );
}

export default NameTile;
