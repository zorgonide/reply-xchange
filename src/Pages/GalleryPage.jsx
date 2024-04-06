import React, { useEffect, useState } from 'react';
import axios from 'axios';

function GalleryPage() {
    const [images, setImages] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);

    const getImages = () => {
        axios
            .get('https://jsonplaceholder.typicode.com/photos')
            .then((response) => {
                return response.data;
            })
            .then((data) => {
                setImages(data.slice(0, 12));
            });
    };
    useEffect(() => {
        getImages();
    }, []);
    const toggleImageSelection = (image) => {
        setSelectedImages((prevSelectedImages) => {
            if (prevSelectedImages.some((e) => e.id === image.id)) {
                return prevSelectedImages.filter((e) => e.id !== image.id);
            } else {
                return [...prevSelectedImages, image];
            }
        });
    };

    return (
        <div className='container mx-auto p-4'>
            <style>
                {`
                .custom-checkbox {
                    width: 24px;
                    height: 24px;
                    cursor: pointer;
                }
                .image-container {
                    position: relative;
                    transition: transform 0.2s;
                    cursor: pointer;
                }
                .image-container:hover {
                    transform: scale(1.02);
                }
                img {
                    display: block;
                    max-width: 100%;
                    height: auto;
                    border-radius: 8px;
                }
                `}
            </style>
            <div className='grid grid-cols-4 gap-4'>
                {images.map((image) => (
                    <div key={image.id} className='image-container bg-gray-200 p-1' onClick={() => toggleImageSelection(image)}>
                        <input
                            type='checkbox'
                            className='custom-checkbox absolute top-0 right-0 m-2'
                            checked={selectedImages.some((e) => e.id === image.id)}
                        />
                        <img src={image.url} alt={image.title} />
                    </div>
                ))}
            </div>
        </div>
    );
}
export default GalleryPage;
