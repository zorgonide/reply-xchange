import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cat from '../assets/cat-magic.gif';
import { useNavigate } from 'react-router-dom';
function GameSessionsPage() {
    let array = new Array(100).fill().map((_, i) => 'User ' + (i + 1));
    const [usernames, setUsernames] = useState([]);
    const history = useNavigate();
    useEffect(() => {
        const fetchUsernames = async () => {
            try {
                const response = await axios.get('http://localhost:4502/bin/getgame');
                if (Array.isArray(response.data)) {
                    setUsernames(response.data); // assuming the API returns an array of usernames
                }
                throw new Error('Invalid response from server');
            } catch (error) {
                console.error('Failed to fetch usernames:', error);
                setUsernames(array);
            }
        };

        fetchUsernames();
    }, []);

    const handleUserClick = (username) => {
        // Navigate to a route. This might be something like `/game/${username}`
        // Ensure you have a route setup to handle this URL in your app's Router
        history.push(`/game/${username}`);
    };

    return (
        <div className='flex flex-col min-h-screen bg-gray-50'>
            <div className='container p-4 mx-auto'>
                <div className='flex gap-4'>
                    <div className='flex flex-col flex-start'>
                        <div className='cat '>
                            <img src={Cat} alt='cat' className='object-contain' />
                            <p className='text-center font-semibold my-4'>Catto is doing its magic</p>
                        </div>
                    </div>
                    <div className='grow'>
                        <h1 className='text-lg font-semibold text-gray-700 mb-4'>Select a Game Session</h1>
                        <div className='grid grid-cols-3 gap-4'>
                            {usernames.map((username) => (
                                <div
                                    key={username}
                                    className='cursor-pointer bg-white font-semibold p-2 border rounded shadow-lg text-cred text-center hover:bg-gray-50'
                                    // onClick={() => handleUserClick(username)}
                                >
                                    {username}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GameSessionsPage;
