import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GIF from '../assets/loading.gif';
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
                let usernames = data.map((item) => item.name);
                if (Array.isArray(data)) {
                    setUsernames(usernames.reverse());
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
        <div className='min-h-screen bg-cblue'>
            <div className='container p-4 mx-auto'>
                <h1 className='text-4xl my-4 text-white font-mono font-bold'>Game Sessions</h1>
                <p className='text-white mb-4'>Select a user to start a game session</p>
                <div className='flex gap-9'>
                    <div className='grow'>
                        <div className='grid grid-cols-6 gap-4'>
                            <div className='bg-cred'>
                                <img src={GIF} alt='cat' className='rounded-none' />
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
