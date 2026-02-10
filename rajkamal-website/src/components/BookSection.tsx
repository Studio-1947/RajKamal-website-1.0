import React, { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
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
}

const BookSection: React.FC<BookSectionProps> = ({
    title,
    filters,
    books,
    onFilterChange,
    activeFilter,
    titleIcon
}) => {
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
        <div className="py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <div className="flex items-center gap-2">
                        {titleIcon}
                        <h2 className="text-3xl font-medium text-red-500">{title}</h2>
                    </div>

                    <button className="bg-[#CCEAFF] text-[#006BB8] px-4 py-2 rounded-full text-sm font-medium flex items-center hover:bg-[#CCEAFF]/80 transition-colors w-fit">
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
                                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${activeFilter === filter
                                    ? 'bg-[#006BB8] text-white'
                                    : 'bg-[#E3E3E3] text-[#666666] hover:bg-[#E3E3E3]/80'
                                    }`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                )}

                {/* Navigation Buttons (Absolute positioned relative to container) */}
                <div className="relative group/section">
                    <NavigationButton
                        direction="left"
                        onClick={() => scroll('left')}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover/section:opacity-100 disabled:opacity-0 -ml-4 hidden md:flex"
                    />

                    <NavigationButton
                        direction="right"
                        onClick={() => scroll('right')}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover/section:opacity-100 disabled:opacity-0 -mr-4 hidden md:flex"
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
