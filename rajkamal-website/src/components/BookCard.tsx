import React from 'react';
import { Heart, Star } from 'lucide-react';
import type { Book } from '../types';

interface BookCardProps {
    book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
    return (
        <div className="bg-white rounded-xl p-4 relative group h-full flex flex-col shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            {/* Wishlist Button */}
            <button className="absolute top-4 right-4 z-10 p-1.5 bg-white/80 rounded-full hover:bg-white transition-colors">
                <Heart
                    className={`h-5 w-5 ${book.isLiked ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
                />
            </button>

            {/* Book Image */}
            <div className="relative aspect-[3/4] mb-4 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
                {/* Tag (e.g., Best Seller) */}
                {book.tag && (
                    <div className={`absolute top-2 left-2 ${book.tag.color} text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide`}>
                        {book.tag.text}
                    </div>
                )}
            </div>

            {/* Content Container */}
            <div className="flex flex-col flex-grow">
                {/* Rating */}
                <div className="flex items-center mb-2">
                    <div className="bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded flex items-center">
                        {book.rating} <Star className="h-3 w-3 ml-0.5 fill-current" />
                    </div>
                    <span className="text-gray-400 text-xs ml-2 font-medium">{book.reviews.toLocaleString()}</span>
                </div>

                {/* Title & Author */}
                <div className="mb-3">
                    <h3 className="font-bold text-gray-900 text-lg leading-tight mb-1 line-clamp-1" title={book.title}>{book.title}</h3>
                    <p className="text-gray-500 text-xs line-clamp-2" title={book.author}>{book.author}</p>
                </div>

                {/* Formats */}
                <div className="flex flex-wrap gap-2 mb-4 mt-auto">
                    {book.formats?.map((format, index) => (
                        <span
                            key={index}
                            className={`text-[10px] px-2 py-1 rounded border font-medium ${index === 0
                                ? 'bg-blue-600 text-white border-blue-600'
                                : 'bg-white text-blue-500 border-blue-200'
                                }`}
                        >
                            {format}
                        </span>
                    ))}
                </div>

                {/* Price */}
                <div className="flex items-baseline mb-4">
                    <span className="text-red-500 text-xl font-bold">₹{book.price}</span>
                    <span className="text-gray-400 text-sm line-through ml-2">₹{book.originalPrice}</span>
                    <span className="text-green-600 text-xs font-bold ml-2">{book.discount}% off</span>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 mt-auto">
                    <button className="flex-1 bg-blue-100 text-blue-700 py-2 rounded-lg font-bold text-sm hover:bg-blue-200 transition-colors">
                        Buy Now
                    </button>
                    <button className="flex-1 bg-white border border-red-300 text-red-500 py-2 rounded-lg font-bold text-sm hover:bg-red-50 transition-colors">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BookCard;
