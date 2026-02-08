import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageCarouselProps {
    images: string[];
    title: string;
}

export default function ImageCarousel({ images, title }: ImageCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const goToNext = () => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    return (
        <div className="group">
            <div className="relative">
                {/* Main Image */}
                <div className="aspect-video bg-gray-100 rounded-2xl overflow-hidden">
                    <img
                        src={images[currentIndex]}
                        alt={`${title} screenshot ${currentIndex + 1}`}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Navigation Arrows */}
                {images.length > 1 && (
                    <>
                        <button
                            onClick={goToPrevious}
                            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white shadow-lg"
                        >
                            <ChevronLeft className="w-5 h-5 text-black" />
                        </button>
                        <button
                            onClick={goToNext}
                            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white shadow-lg"
                        >
                            <ChevronRight className="w-5 h-5 text-black" />
                        </button>
                    </>
                )}
            </div>


            {/* Thumbnails */}
            {images.length > 1 && (
                <div className="flex gap-3 mt-4">
                    {images.map((image, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`flex-1 aspect-video rounded-lg overflow-hidden transition-all ${index === currentIndex
                                ? 'ring-2 ring-black ring-offset-2'
                                : 'opacity-60 hover:opacity-100'
                                }`}
                        >
                            <img
                                src={image}
                                alt={`${title} thumbnail ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                        </button>
                    ))}
                </div>
            )}

            {/* Dots Indicator */}
            {/* {images.length > 1 && (
                <div className="flex justify-center gap-2 mt-4">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`w-2 h-2 rounded-full transition-all ${index === currentIndex
                                ? 'bg-black w-6'
                                : 'bg-gray-300 hover:bg-gray-400'
                                }`}
                        />
                    ))}
                </div>
            )} */}
        </div>
    );
}
