import React, { useRef } from 'react';
import { ArrowLeft, ArrowRight, ArrowRight as ArrowIcon } from 'lucide-react';

const categories = [
    {
        id: 1,
        title: 'Best Sellers',
        color: 'from-red-800 to-red-600',
        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' // Placeholder for 3D character
    },
    {
        id: 2,
        title: 'Award Winners',
        color: 'from-red-900 to-red-700',
        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 3,
        title: 'Gifting Sets',
        color: 'from-red-800 to-red-600',
        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 4,
        title: 'World Classics',
        color: 'from-red-900 to-red-700',
        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 5,
        title: 'Representative Stories',
        color: 'from-red-800 to-red-600',
        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    }
];

const CategoryCarousel: React.FC = () => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 300;
            const newScrollLeft = direction === 'left'
                ? scrollContainerRef.current.scrollLeft - scrollAmount
                : scrollContainerRef.current.scrollLeft + scrollAmount;

            scrollContainerRef.current.scrollTo({
                left: newScrollLeft,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="bg-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

                {/* Navigation Buttons */}
                <button
                    onClick={() => scroll('left')}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-gray-100 hover:bg-gray-200 p-2 rounded-full shadow-md transition-colors"
                >
                    <ArrowLeft className="h-6 w-6 text-gray-600" />
                </button>

                <button
                    onClick={() => scroll('right')}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-gray-100 hover:bg-gray-200 p-2 rounded-full shadow-md transition-colors"
                >
                    <ArrowRight className="h-6 w-6 text-gray-600" />
                </button>

                {/* Carousel Container */}
                <div
                    ref={scrollContainerRef}
                    className="flex space-x-6 overflow-x-auto pb-8 pt-4 px-4 scrollbar-hide snap-x"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {categories.map((category) => (
                        <div
                            key={category.id}
                            className="flex-none w-64 sm:w-72 h-96 relative rounded-3xl overflow-hidden shadow-lg snap-center group cursor-pointer"
                        >
                            {/* Background Gradient */}
                            <div className={`absolute inset-0 bg-gradient-to-b ${category.color} opacity-90`}></div>

                            {/* 3D Character Image (Placeholder) */}
                            <div className="absolute inset-0 flex items-center justify-center pt-10">
                                <div className="w-48 h-48 bg-red-400 rounded-full blur-3xl opacity-50 absolute top-10"></div>
                                <img
                                    src={category.image}
                                    alt={category.title}
                                    className="relative z-10 w-48 h-48 object-cover rounded-full mix-blend-overlay opacity-80"
                                />
                                {/* Simulated 3D Character */}
                                <div className="absolute z-20 top-20 w-32 h-32 bg-red-500 rounded-full shadow-inner flex items-center justify-center text-white font-bold">
                                    3D Char
                                </div>
                            </div>

                            {/* Content */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 z-30">
                                <h3 className="text-white text-2xl font-bold mb-4 leading-tight">{category.title}</h3>
                                <button className="bg-blue-100 text-blue-900 px-4 py-2 rounded-full text-sm font-semibold flex items-center hover:bg-white transition-colors">
                                    Explore <ArrowIcon className="ml-2 h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CategoryCarousel;
