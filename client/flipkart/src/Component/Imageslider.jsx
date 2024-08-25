// src/ImageSlider.js
import React, { useState, useEffect } from 'react';
import './ImageSlider.css'; // Import CSS for styling

const images = [
    { src: 'https://via.placeholder.com/500x400?text=Image+1' },
    { src: 'https://via.placeholder.com/500x400?text=Image+2' },
    { src: 'https://via.placeholder.com/500x400?text=Image+3' },
    { src: 'https://via.placeholder.com/500x400?text=Image+4' },
];

const Imageslider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    // Optional: Auto-slide every 3 seconds
    useEffect(() => {
        const interval = setInterval(nextSlide, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="slider">
            <button className="prev" onClick={prevSlide}>❮</button>
            <div className="slider-content">
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image.src}
                        alt={`Slide ${index}`}
                        className={`slide ${index === currentIndex ? 'active' : ''}`}
                    />
                ))}
            </div>
            <button className="next" onClick={nextSlide}>❯</button>
        </div>
    );
};

export default Imageslider;