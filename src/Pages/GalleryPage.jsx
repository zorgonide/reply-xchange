import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './GalleryPage.css';
import Footer from '../Components/Footer/Footer';
import Preview from '../Components/Preview/Preview';
function GalleryPage() {
    const [images, setImages] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);
    const [selectImages, setSelectImages] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);
    const getImages = () => {
        axios
            .get('http://localhost:4502/bin/getassets', {
                headers: {
                    Authorization: 'Basic YWRtaW46YWRtaW4=',
                },
            })
            .then((response) => {
                return response.data;
            })
            .then((data) => {
                setImages(data);
            });
    };
    useEffect(() => {
        getImages();
    }, []);
    const toggleImageSelection = (image) => {
        if (selectImages) {
            setSelectedImages((prevSelectedImages) => {
                if (prevSelectedImages.some((e) => e.id === image.id)) {
                    return prevSelectedImages.filter((e) => e.id !== image.id);
                } else {
                    return [...prevSelectedImages, image];
                }
            });
        } else {
            setPreviewImage(image);
            setShowModal(true);
        }
    };

    return (
        <div className='container mx-auto p-4'>
            <div className='flex justify-end pb-4 pt-3'>
                <button
                    onClick={() => {
                        setSelectImages(!selectImages);
                        setSelectedImages([]);
                    }}
                    className={`font-bold py-2 px-4 rounded border border-black transition-colors duration-150 ${
                        selectImages ? 'bg-black text-white hover:bg-gray-800' : 'bg-white text-black hover:bg-gray-200'
                    }`}
                >
                    Select Images
                </button>
            </div>
            <div className='grid grid-cols-4 gap-4'>
                {images.map((image) => (
                    <div key={image.id} className='image-container bg-gray-200 p-1' onClick={() => toggleImageSelection(image)}>
                        <input
                            type='checkbox'
                            className='custom-checkbox absolute top-0 right-0 m-2'
                            checked={selectedImages.some((e) => e.id === image.id)}
                            readOnly
                            style={{ display: selectImages ? 'block' : 'none' }}
                        />
                        <img src={image.url} alt={image.title} />
                    </div>
                ))}
            </div>
            {selectedImages.length > 0 && <Footer images={selectedImages} />}
            {showModal && <Preview image={previewImage} onClose={() => setShowModal(false)} />}
        </div>
    );
}
export default GalleryPage;
