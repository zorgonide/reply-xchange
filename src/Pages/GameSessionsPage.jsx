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
                <div className='flex gap-9'>
                    <div className='grow'>
                        <div className='grid grid-cols-6 gap-4'>
                            <div className='bg-cred p-7'>
                                <img src={Cat} alt='cat' />
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
