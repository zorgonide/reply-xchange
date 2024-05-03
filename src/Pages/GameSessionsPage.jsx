import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cat from '../assets/cat-magic.gif';
import { useNavigate } from 'react-router-dom';
import NameTile from '../Components/NameTile/NameTile';
function GameSessionsPage() {
    const [usernames, setUsernames] = useState([]);
    const [cats, setCats] = useState([]);
    const [length, setLength] = useState(0);
    let navigate = useNavigate();
    const routeChange = (username) => {
        let path = `/game/${username}`;
        navigate(path);
    };
    const getCats = async (limit) => {
        try {
            const response = await axios.get('https://api.thecatapi.com/v1/images/search?limit=' + limit, {
                headers: {
                    'x-api-key': 'live_rVPCr1yWe8e98YSccUHVmyfLkuXzHxNyhZZrpT2p7B6sYvVJb5gxuCJHWZh3DAGk',
                },
            });
            let data = await response.data;
            setCats(data);
        } catch (error) {
            console.error('Failed to fetch cat image:', error);
        }
    };
    useEffect(() => {
        const fetchUsernames = async () => {
            try {
                const response = await axios.get('http://localhost:4502/bin/getGame', {
                    headers: {
                        Authorization: 'Basic YWRtaW46YWRtaW4=',
                    },
                });
                let data = await response.data;
                if (Array.isArray(data)) {
                    if (data.length > length) getCats(data.length);
                    setUsernames(data);
                    setLength(data.length);
                } else throw new Error('Invalid response from server');
            } catch (error) {
                console.error('Failed to fetch usernames:', error);
            }
        };
        fetchUsernames();
        const intervalId = setInterval(fetchUsernames, 3000); // Fetch usernames every 5 seconds
        // Clean up the interval on component unmount
        return () => clearInterval(intervalId);
    }, [length]);

    return (
        <div className='flex flex-col min-h-screen bg-gray-50'>
            <div className='container p-4 mx-auto'>
                <div className='flex gap-9'>
                    <div className='grow'>
                        <h1 className='text-xl font-semibold text-gray-700 mb-4'>Select a Game Session</h1>
                        <div className='grid grid-cols-3 gap-4'>
                            {usernames.map((username, i) => (
                                <NameTile key={username} username={username} routeChange={routeChange} cat={cats[i]?.url} />
                            ))}
                        </div>
                    </div>
                    <div className='flex flex-col flex-start'>
                        <div className='cat '>
                            <img src={Cat} alt='cat' className='object-contain' />
                            <p className='text-center text-gray-700 text-lg font-semibold my-4'>While you wait, Catto is doing its magic</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GameSessionsPage;
