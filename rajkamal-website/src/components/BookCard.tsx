import React from 'react';
import { Heart, Star, Minus, Plus } from 'lucide-react';
import type { Book } from '../types';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

interface BookCardProps {
    book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
    const { addToCart, cartItems, updateQuantity } = useCart();

    const cartItem = cartItems.find(item => item.id === book.id);
    const quantityInCart = cartItem?.quantity || 0;

    const handleIncrement = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (quantityInCart === 0) {
            addToCart(book);
        } else {
            updateQuantity(book.id, quantityInCart + 1);
        }
    };

    const handleDecrement = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (quantityInCart > 0) {
            updateQuantity(book.id, quantityInCart - 1);
        }
    };

    return (
        <div className="bg-white rounded-xl p-4 relative group/card h-full flex flex-col shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            {/* Wishlist Button */}
            <button className="absolute top-6 right-6 z-10 p-1.5 bg-white/80 rounded-full hover:bg-white transition-colors">
                <Heart
                    className={`h-5 w-5 ${book.isLiked ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
                />
            </button>



            {/* Book Image */}
            <Link to={`/book/${book.id}`} className="block relative aspect-[3/4] mb-4 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-full object-cover transform group-hover/card:scale-105 transition-transform duration-300"
                />
                {/* Tag (e.g., Best Seller) */}
                {book.tag && (
                    <div className={`absolute top-2 left-2 ${book.tag.color} text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide`}>
                        {book.tag.text}
                    </div>
                )}
            </Link>

            {/* Content Container */}
            <div className="flex flex-col flex-grow">
                {/* Rating */}
                <div className="flex items-center mb-2">
                    <div className="bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded flex items-center">
                        {book.rating} <Star className="h-3 w-3 ml-0.5 fill-current" />
                    </div>
                    <span className="text-gray-400 text-xs ml-2 font-medium">{book.reviews.toLocaleString()} Reviews</span>
                </div>

                {/* Title & Author */}
                <div className="mb-3">
                    <Link to={`/book/${book.id}`}>
                        <h3 className="font-bold text-gray-900 text-lg leading-tight mb-1 line-clamp-1 hover:text-red-500 transition-colors" title={book.title}>{book.title}</h3>
                    </Link>
                    <p className="text-gray-500 text-xs line-clamp-2" title={book.author}>{book.author}</p>
                </div>

                {/* Formats */}
                <div className="flex flex-wrap gap-2 mb-4 mt-auto">
                    {book.formats?.map((format, index) => (
                        <span
                            key={index}
                            className={`text-[10px] px-2 py-1 rounded-[10px] border font-medium ${index === 0
                                ? 'bg-[#00508A] text-white border-[#00508A]'
                                : 'bg-white text-[#00508A] '
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
                    <button className="flex-1 bg-[#CCEAFF] text-[#00508A] py-2.5 sm:py-2 rounded-lg font-medium text-sm hover:bg-[#CCEAFF]/80 transition-colors">
                        Buy Now
                    </button>

                    {quantityInCart > 0 ? (
                        <div className="flex-1 flex items-center justify-between bg-white border border-red-300 rounded-lg px-2 py-1">
                            <button
                                onClick={handleDecrement}
                                className="p-1.5 sm:p-1 hover:bg-red-50 text-red-500 rounded transition-colors"
                            >
                                <Minus className="h-4 w-4" />
                            </button>
                            <span className="font-medium text-gray-900">{quantityInCart}</span>
                            <button
                                onClick={handleIncrement}
                                className="p-1.5 sm:p-1 hover:bg-red-50 text-red-500 rounded transition-colors"
                            >
                                <Plus className="h-4 w-4" />
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => addToCart(book)}
                            className="flex-1 bg-white border border-red-300 text-red-500 py-2.5 sm:py-2 rounded-lg font-medium text-sm hover:bg-red-50 transition-colors"
                        >
                            Add to Cart
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BookCard;
