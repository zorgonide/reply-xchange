import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import GalleryPage from './Pages/GalleryPage';

function App() {
    return (
        <Router>
            <HomePage />
        </Router>
    );
}

export default App;
