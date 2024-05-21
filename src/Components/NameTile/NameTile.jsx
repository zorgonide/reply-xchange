import React, { useState, useEffect } from 'react';
import axios from 'axios';
import holdingCard from '../../assets/Holding-Card.png';

function NameTile({ username, routeChange, index }) {
    const [image, setImage] = useState(null);
    const [gamePlayed, setGamePlayed] = useState(false);

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
        setGamePlayed(true);
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
        setGamePlayed(checkForGamePlayed(username));
    }, [username]);

    return (
        <div
            key={username}
            className='relative aspect-square cursor-pointer hover:bg-gray-50 border transition duration-300 ease-in-out'
            onClick={() => {
                addToGamePlayed(username);
                routeChange(username);
            }}
        >
            <img
                key={index}
                src={image?.url}
                alt={`Sticker ${(index + 1) % 60}`}
                className={`object-cover rounded-none ${!gamePlayed ? 'opacity-50' : ''}`}
            />
            {!gamePlayed && (
                <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50'>
                    {/* <span className='text-white text-2xl font-bold'>PLAY THE GAME</span> */}
                    <img src={holdingCard} alt='holding card' className='opacity-40 rounded-none' />
                </div>
            )}
            <div className='w-full justify-center bg-cblue py-1 bg-opacity-50 flex text-xl absolute bottom-0 font-mono'>
                <div className='text-white opacity-none'>{username.replace(/[^a-zA-Z]/g, '')}</div>
            </div>
        </div>
    );
}

export default NameTile;
