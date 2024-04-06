import React from 'react';
import FileUploadCard from '../Components/FileUploadCard/FileUploadCard';
import Header from '../Components/Header/Header'; // Adjust the import path as needed
import { Route, Routes } from 'react-router';
import GalleryPage from './GalleryPage';

function HomePage() {
    return (
        <>
            <Header />
            <Routes>
                <Route path='/' element={<FileUploadCard />} />
                <Route path='/gallery' element={<GalleryPage />} />
            </Routes>
        </>
    );
}

export default HomePage;
