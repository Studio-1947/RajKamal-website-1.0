import React, { useRef } from 'react';
import { ArrowRight as ArrowIcon } from 'lucide-react';
import NavigationButton from './ui/NavigationButton';
const categories = [
    {
        id: 1,
        title: 'Best Sellers',
        image: '/carousel/Best sellers.png'
    },
    {
        id: 2,
        title: 'Award Winners',
        image: '/carousel/award winners.png'
    },
    {
        id: 3,
        title: 'Gifting Sets',
        image: '/carousel/gift.png'
    },
    {
        id: 4,
        title: 'World Classics',
        image: '/carousel/world classics.png'
    },
    {
        id: 5,
        title: 'Representative Stories',
        image: '/carousel/stories.png'
    },
    {
        id: 6,
        title: 'Representative Poems',
        image: '/carousel/poems-pic.png'
    },
    {
        id: 7,
        title: 'Children Books',
        image: '/carousel/childrens books.png'
    },
    {
        id: 8,
        title: 'Magazines',
        image: '/carousel/magazines.png'
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
                {/* Navigation Buttons */}
                <NavigationButton
                    direction="left"
                    onClick={() => scroll('left')}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 hidden md:flex -ml-4"
                />

                <NavigationButton
                    direction="right"
                    onClick={() => scroll('right')}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 hidden md:flex -mr-4"
                />

                {/* Carousel Container */}
                <div
                    ref={scrollContainerRef}
                    className="flex space-x-6 overflow-x-auto pb-8 pt-4 px-4 scrollbar-hide snap-x"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {categories.map((category) => (
                        <div
                            key={category.id}
                            className="flex-none w-[260px] sm:w-72 h-96 relative rounded-3xl overflow-hidden shadow-lg snap-center group cursor-pointer"
                        >
                            {/* Background Image */}
                            <img
                                src={category.image}
                                alt={category.title}
                                className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
                            />

                            {/* Background Gradient Text Overlay */}
                            <div className="absolute inset-0 z-10 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent"></div>

                            {/* Content */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 z-30 transition-transform duration-300 group-hover:-translate-y-2">
                                <h3 className="text-white text-2xl font-bold mb-4 leading-tight">{category.title}</h3>
                                <button className="bg-blue-100 text-blue-900 px-4 py-2 rounded-full text-sm font-semibold flex items-center hover:bg-white transition-colors shadow-md">
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
