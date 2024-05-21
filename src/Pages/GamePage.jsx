import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Confetti from 'react-confetti';
import './GamePage.css';
import GameTile from '../Components/GameTile/GameTile';
function GamePage() {
    const [images, setImages] = useState([]);
    const [status, setStatus] = useState(false);
    const [selectedImage, setSelectedImage] = useState([]);
    const [incorrectSelection, setIncorrectSelection] = useState([]);
    const { id } = useParams();
    function getWindowDimensions() {
        const { innerWidth: width, innerHeight: height } = window;
        return {
            width,
            height,
        };
    }
    const { width, height } = getWindowDimensions();
    function randomSort(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }
    const getImages = () => {
        axios
            .get('http://localhost:4502/bin/getAssets?username=' + id, {
                headers: {
                    Authorization: 'Basic YWRtaW46YWRtaW4=',
                },
            })
            .then((response) => response.data)
            .then((data) => {
                randomSort(data);
                setImages(data);
            });
    };
    useEffect(() => {
        getImages();
    }, []);
    const toggleImageSelection = (image) => {
        setSelectedImage(image);
    };
    const checkSelection = () => {
        if (!selectedImage.source) {
            setStatus(true);
        } else {
            setIncorrectSelection([...incorrectSelection, selectedImage]);
        }
    };
    return (
        <div className='min-h-screen bg-cblue'>
            <div className='container mx-auto'>
                <h1 className='text-3xl text-white pt-7 font-mono font-bold'>Who do you think is real?</h1>
                <div className='grid grid-cols-3 gap-8 place-content-center py-10'>
                    {images.map((image, i) => (
                        <GameTile
                            key={image.id}
                            image={image}
                            toggleImageSelection={toggleImageSelection}
                            selectedImages={selectedImage}
                            incorrectSelection={incorrectSelection}
                            index={i}
                            name={id.replace(/[^a-zA-Z]/g, '')}
                            didWin={status}
                        />
                    ))}
                </div>
                {selectedImage.id && (
                    <div className='bg-gray-200 text-white fixed p-2 bottom-0 left-0 right-0 z-50'>
                        <div className='flex justify-end'>
                            <button
                                onClick={() => checkSelection()}
                                className='px-4 py-2 border border-transparent shadow-md text-md font-medium rounded-md text-white bg-cred hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 '
                            >
                                Select
                            </button>
                        </div>
                    </div>
                )}
                <Confetti width={width - 50} height={height} recycle={false} initialVelocityY={5} run={status} numberOfPieces={400} />
            </div>
        </div>
    );
}
export default GamePage;
