import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from '../Components/Image/Image';
import { useParams } from 'react-router-dom';
import useWindowSize from 'react-use/lib/useWindowSize';
import Confetti from 'react-confetti';
function GamePage() {
    const [images, setImages] = useState([]);
    const [status, setStatus] = useState(false);
    const [selectedImages, setSelectedImage] = useState([]);
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
        if (!selectedImages.source) {
            setStatus(true);
        } else {
            alert('you got that wrong!');
        }
    };
    return (
        <div className='container mx-auto p-4'>
            <div className='grid grid-cols-3'>
                {images.map((image) => (
                    <Image
                        key={image.id}
                        image={image}
                        toggleImageSelection={toggleImageSelection}
                        selectedImages={selectedImages}
                        selectImages={true}
                    />
                ))}
            </div>
            {selectedImages.id && (
                <div className='bg-gray-400 text-white fixed p-4 bottom-0 left-0 right-0 z-50'>
                    <div className='flex justify-end'>
                        <button
                            onClick={() => checkSelection()}
                            className='px-4 py-2 border border-transparent shadow-md text-md font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 '
                        >
                            Select
                        </button>
                    </div>
                </div>
            )}
            {/* {showModal && <Preview image={previewImage} onClose={() => setShowModal(false)} />} */}
            <Confetti
                width={width}
                height={height}
                recycle={false}
                initialVelocityY={5}
                run={status}
                numberOfPieces={400}
                onConfettiComplete={() => {
                    alert('You got it right!');
                }}
            />
        </div>
    );
}
export default GamePage;
