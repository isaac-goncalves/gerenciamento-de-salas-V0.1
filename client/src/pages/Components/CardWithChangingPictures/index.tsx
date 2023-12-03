import React, { useState, useEffect } from 'react';

// import banner from '../../../../public/images/banner/banner.jpg';
import img1 from '../../../../public/images/banner/img1.jpeg';
import img2 from '../../../../public/images/banner/img2.jpeg';
import img3 from '../../../../public/images/banner/img3.jpeg';
import img4 from '../../../../public/images/banner/img4.jpeg';
import img5 from '../../../../public/images/banner/img5.jpeg';

import { MainWrapper, ImageWrapper } from './CardWithChangingPictures.styles'

const CardWithChangingPictures: React.FC = () => {
    // Step 4: Set up state for images and current image index
    const [images, setImages] = useState<string[]>([
        img1, // Replace with your image URLs
        img2,
        img3,
        img4,
        img5,
    ]);
    const [primaryCurrentImageIndex, setPrimaryCurrentImageIndex] = useState<number>(0);
    const [secondaryCurrentImageIndex, setSecondaryCurrentImageIndex] = useState<number>(1);
    // const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);


    // Step 5: Use useEffect for periodic image change
    useEffect(() => {
        const interval = setInterval(() => {
            setPrimaryCurrentImageIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
            setSecondaryCurrentImageIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );

        }, 5000); // Change images every 3 seconds (adjust this interval as needed)

        return () => clearInterval(interval);
    }, [images]);

    // Step 6: Create a function to change images when clicked
    const changeImage = () => {
        setPrimaryCurrentImageIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
        setSecondaryCurrentImageIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
        //reset the interval
    };

    // Step 7: Render the component
    return (
        <MainWrapper>
            <ImageWrapper
                className="card"
                onClick={changeImage}
            >
                {/* Step 8: Use CSS transitions and map images */}
                <div
                    style={{
                        display: 'flex',
                        transition: 'transform 0.5s ease-in-out',
                        transform: `translateX(-${primaryCurrentImageIndex * 100}%)`,
                    }}
                >
                    {images.map((imageUrl, index) => (
                        <img
                            key={index}
                            src={imageUrl}
                            alt={`Image ${index + 1}`}
                            style={{
                                width: '100%',
                                height: 'auto',
                                flex: '0 0 auto',
                            }}
                        />
                    ))}
                </div>
            </ImageWrapper>
            <ImageWrapper
                className="card"
                onClick={changeImage}

            >
                {/* Step 8: Use CSS transitions and map images */}
                <div
                    style={{
                        display: 'flex',
                        transition: 'transform 0.5s ease-in-out',
                        transform: `translateX(-${secondaryCurrentImageIndex * 100}%)`,
                    }}
                >
                    {images.map((imageUrl, index) => (
                        <img
                            key={index}
                            src={imageUrl}
                            alt={`Image ${index + 1}`}
                            style={{
                                width: '100%',
                                height: 'auto',
                                flex: '0 0 auto',
                            }}
                        />
                    ))}
                </div>
            </ImageWrapper>
        </MainWrapper>
    );
};

export default CardWithChangingPictures;