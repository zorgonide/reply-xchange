import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './GalleryPage.css';
import Footer from '../Components/Footer/Footer';
import Preview from '../Components/Preview/Preview';
import RefreshButton from '../Components/RefreshButton/RefreshButton';
import Image from '../Components/Image/Image';
function GalleryPage() {
    const [images, setImages] = useState([]);
    const [originalImages, setOriginalImages] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);
    const [selectImages, setSelectImages] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);
    const [dropdownOption, setDropdownOption] = React.useState('all');
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
                setOriginalImages(data);
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
    const changeFilter = (filter) => {
        setDropdownOption(filter);
        if (filter === 'all') {
            setImages(originalImages);
        } else {
            setImages(originalImages.filter((image) => image.source == filter));
        }
    };
    return (
        <div className='container mx-auto p-4'>
            <div className='flex justify-between items-center pb-4 pt-3'>
                <div className='relative'>
                    <button className='text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center'>
                        <span className='mr-1'>Filter</span>
                        <select
                            value={dropdownOption}
                            onChange={(e) => changeFilter(e.target.value)}
                            className='border border-gray-300 rounded p-2 shadow-sm focus:outline-none focus:ring-2'
                        >
                            <option value='all'>All</option>
                            <option value='1'>AI</option>
                            <option value='0'>Human</option>
                        </select>
                    </button>
                </div>
                <div className='flex space-x-4'>
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
                    <RefreshButton getImages={getImages} />
                </div>
            </div>
            <div className='grid grid-cols-4 gap-4'>
                {images.map((image) => (
                    <Image
                        key={image.id}
                        image={image}
                        toggleImageSelection={toggleImageSelection}
                        selectedImages={selectedImages}
                        selectImages={selectImages}
                    />
                ))}
            </div>
            {selectedImages.length > 0 && <Footer images={selectedImages} />}
            {showModal && <Preview image={previewImage} onClose={() => setShowModal(false)} />}
        </div>
    );
}
export default GalleryPage;
