import React, { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import NavigationButton from './ui/NavigationButton';
import BookCard from './BookCard';
import type { Book } from '../types';

interface BookSectionProps {
    title: string;
    filters?: string[];
    books: Book[];
    onFilterChange?: (filter: string) => void;
    activeFilter?: string;
    titleIcon?: React.ReactNode;
    bgColor?: string;
    bgClassName?: string;
    viewAllLink?: string;
}

const BookSection: React.FC<BookSectionProps> = ({
    title,
    filters,
    books,
    onFilterChange,
    activeFilter,
    titleIcon,
    bgColor,
    bgClassName,
    viewAllLink
}) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

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
        <div className={`py-12 relative overflow-hidden ${bgClassName || ''}`} style={bgColor ? { backgroundColor: bgColor } : undefined}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <div className="flex items-center gap-2">
                        {titleIcon}
                        <h2 className="text-3xl font-medium text-red-500">{title}</h2>
                    </div>

                    <button
                        onClick={() => viewAllLink && navigate(viewAllLink)}
                        className={`bg-[#CCEAFF] text-[#006BB8] px-4 py-2 rounded-full text-sm font-medium flex items-center transition-colors w-fit ${viewAllLink ? 'hover:bg-[#CCEAFF]/80 cursor-pointer' : 'opacity-50 cursor-not-allowed'}`}
                    >
                        View All <ArrowRight className="ml-2 h-4 w-4" />
                    </button>
                </div>

                {/* Filters */}
                {filters && filters.length > 0 && (
                    <div className="flex flex-wrap gap-3 mb-8">
                        {filters.map((filter) => (
                            <button
                                key={filter}
                                onClick={() => onFilterChange?.(filter)}
                                className={`px-6 py-2 rounded-full text-sm transition-all duration-200 ${activeFilter === filter
                                    ? 'bg-[#F16F6F] text-white font-semibold shadow-md'
                                    : 'bg-[#E4B9B9] text-[#714040] font-normal hover:bg-[#E4B9B9]/90'
                                    }`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                )}

                {/* Navigation Buttons */}
                <div className="relative group/section">
                    <NavigationButton
                        direction="left"
                        onClick={() => scroll('left')}
                        className="absolute -left-4 md:-left-12 lg:-left-16 top-[200px] -translate-y-1/2 z-10 opacity-0 group-hover/section:opacity-100 disabled:opacity-0 hidden md:flex shadow-lg"
                    />

                    <NavigationButton
                        direction="right"
                        onClick={() => scroll('right')}
                        className="absolute -right-4 md:-right-12 lg:-right-16 top-[200px] -translate-y-1/2 z-10 opacity-0 group-hover/section:opacity-100 disabled:opacity-0 hidden md:flex shadow-lg"
                    />

                    {/* Scrollable Container */}
                    <div
                        ref={scrollContainerRef}
                        className="flex space-x-6 overflow-x-auto pb-4 scrollbar-hide snap-x px-1"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {books.map((book) => (
                            <div key={book.id} className="flex-none w-72 snap-center h-full">
                                <BookCard book={book} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookSection;
