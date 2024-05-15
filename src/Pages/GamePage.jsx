import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from '../Components/Image/Image';
import { useParams } from 'react-router-dom';
import useWindowSize from 'react-use/lib/useWindowSize';
import Confetti from 'react-confetti';
import './GamePage.css';
function GamePage() {
    const [images, setImages] = useState([]);
    const [status, setStatus] = useState(false);
    const [selectedImage, setSelectedImage] = useState([]);
    const [incorrectSelection, setIncorrectSelection] = useState([]);
    const { id } = useParams();
    const { width, height } = useWindowSize();
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
        <div className='container mx-auto min-h-screen p-4'>
            <div className='flex flex-wrap gap-9 grow justify-center content-center min-h-screen'>
                <div className='image-container-polaroid mx-auto ease-in duration-300 p-9'>
                    <div className='image-cover' style={{ background: 'white' }}>
                        <p className='text-4xl my-9'>
                            Can you tell what is <span className='font-bold text-cred'>Real</span>?
                        </p>
                    </div>
                </div>
                {images.map((image, i) => (
                    <Image
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
            <Confetti width={width} height={height} recycle={false} initialVelocityY={5} run={status} numberOfPieces={400} />
        </div>
    );
}
export default GamePage;
