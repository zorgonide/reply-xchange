import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cat from '../assets/cat-magic.gif';
import { useNavigate } from 'react-router-dom';
import NameTile from '../Components/NameTile/NameTile';
function GameSessionsPage() {
    const [usernames, setUsernames] = useState([]);
    let navigate = useNavigate();
    const routeChange = (username) => {
        let path = `/game/${username}`;
        navigate(path);
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
                    setUsernames(data);
                } else throw new Error('Invalid response from server');
            } catch (error) {
                console.error('Failed to fetch usernames:', error);
            }
        };
        fetchUsernames();
        const intervalId = setInterval(fetchUsernames, 3000); // Fetch usernames every 5 seconds
        // Clean up the interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className='flex flex-col min-h-screen bg-gray-50'>
            <div className='container p-4 mx-auto'>
                <div className='flex gap-9'>
                    <div className='grow'>
                        <h1 className='text-2xl font-semibold text-gray-700 mb-4'>Select a Game Session</h1>
                        <div className='grid grid-cols-4 gap-4'>
                            <div className='bg-white min-h-64 font-semibold border shadow-sm flex flex-col items-center'>
                                <img src={Cat} alt={`magico`} className='object-contain rounded-none h-56 my-auto' />
                            </div>
                            {usernames.map((username, i) => (
                                <NameTile key={username} username={username} routeChange={routeChange} index={i} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GameSessionsPage;
