import React from 'react';
import { Heart, Star, Minus, Plus } from 'lucide-react';
import type { Book } from '../types';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { getPublicationLogo } from '../data/publicationData';

const formatReviewCount = (count: number): string => {
    if (count >= 1000) {
        const k = count / 1000;
        return k % 1 === 0 ? `${k}k` : `${parseFloat(k.toFixed(1))}k`;
    }
    return count.toString();
};

interface BookCardProps {
    book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
    const { addToCart, cartItems, updateQuantity } = useCart();
    const [selectedFormat, setSelectedFormat] = React.useState<string>(book.formats?.[0] || 'Paperback');

    const currentPrice = book.prices?.[selectedFormat] || book.price;
    const currentOriginalPrice = book.originalPrices?.[selectedFormat] || book.originalPrice;
    const currentDiscount = Math.round(((currentOriginalPrice - currentPrice) / currentOriginalPrice) * 100);

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

    const pubLogo = book.publication ? getPublicationLogo(book.publication) : null;

    return (
        <div className="bg-white rounded-xl p-3 relative group/card h-full flex flex-col shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
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
                    <span className="text-gray-400 text-xs ml-2 font-medium">{formatReviewCount(book.reviews)} Reviews</span>
                </div>

                {/* Info Container - Fixed height to ensure card alignment, but tight internal spacing */}
                <div className="h-[68px] flex flex-col justify-start mb-2 overflow-hidden">
                    {/* Publication Branding */}
                    {book.publication && (
                        <Link
                            to={`/publication/${encodeURIComponent(book.publication)}`}
                            className="flex items-center gap-1 mb-1 w-fit group/pub"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {pubLogo && (
                                <div className="w-4 h-4 flex-shrink-0 flex items-center justify-center rounded-sm overflow-hidden bg-gray-50 border border-gray-100 group-hover/pub:border-red-200 transition-colors">
                                    <img src={pubLogo} alt="" className="max-w-full max-h-full object-contain" />
                                </div>
                            )}
                            <div className="text-[10px] font-extrabold text-red-600 uppercase tracking-widest leading-none group-hover/pub:underline underline-offset-2 transition-all">
                                {book.publication}
                            </div>
                        </Link>
                    )}

                    {/* Title */}
                    <Link to={`/book/${book.id}`} className="block">
                        <h3 className="font-bold text-gray-900 text-[14px] leading-tight line-clamp-2 hover:text-red-500 transition-colors" title={book.title}>
                            {book.title}
                        </h3>
                    </Link>

                    {/* Author */}
                    <div className="flex items-center gap-1 mt-1">
                        <span className="text-[10px] text-gray-400 font-medium uppercase tracking-tighter shrink-0">By</span>
                        <Link
                            to={`/author/${encodeURIComponent(book.author.split(',').pop()?.trim() || '')}`}
                            onClick={(e) => e.stopPropagation()}
                            className="text-gray-600 text-[11px] font-semibold line-clamp-1 hover:text-[#00508A] hover:underline transition-colors"
                            title={book.author.split(',').pop()?.trim()}
                        >
                            {book.author.split(',').pop()?.trim()}
                        </Link>
                    </div>
                </div>

                {/* Formats - Consistent padding */}
                <div className="flex flex-wrap gap-2 mb-2">
                    <div className="flex gap-1.5 min-h-[22px]">
                        {book.formats?.map((format, index) => (
                            <button
                                key={index}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setSelectedFormat(format);
                                }}
                                className={`text-[10px] px-1.5 py-0.5 rounded-[8px] border font-medium transition-colors ${selectedFormat === format
                                    ? 'bg-[#00508A] text-white border-[#00508A]'
                                    : 'bg-white text-[#00508A] hover:bg-blue-50'
                                    }`}
                            >
                                {format}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Price */}
                <div className="flex items-baseline mb-2">
                    <span className="text-red-500 text-lg font-bold">₹{currentPrice}</span>
                    <span className="text-gray-400 text-xs line-through ml-1.5">₹{currentOriginalPrice}</span>
                    <span className="text-green-600 text-xs font-bold ml-1.5">{currentDiscount}% off</span>
                </div>

                {/* Buttons */}
                <div className="flex gap-2 mt-auto">
                    <button className="flex-1 bg-[#CCEAFF] text-[#00508A] py-2 rounded-lg font-medium text-xs hover:bg-[#CCEAFF]/80 transition-colors">
                        Buy Now
                    </button>

                    {quantityInCart > 0 ? (
                        <div className="flex-1 flex items-center justify-between bg-white border border-red-300 rounded-lg px-2 py-1">
                            <button
                                onClick={handleDecrement}
                                className="p-1 hover:bg-red-50 text-red-500 rounded transition-colors"
                            >
                                <Minus className="h-3 w-3" />
                            </button>
                            <span className="font-medium text-xs text-gray-900">{quantityInCart}</span>
                            <button
                                onClick={handleIncrement}
                                className="p-1 hover:bg-red-50 text-red-500 rounded transition-colors"
                            >
                                <Plus className="h-3 w-3" />
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => addToCart(book)}
                            className="flex-1 bg-white border border-red-300 text-red-500 py-2 rounded-lg font-medium text-xs hover:bg-red-50 transition-colors"
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
