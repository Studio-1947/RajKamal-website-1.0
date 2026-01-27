import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Heart, Share2, Minus, Plus, ChevronRight, ShoppingCart, Truck, ShieldCheck } from 'lucide-react';
import { newArrivals, hotDeals, genreBooks } from '../data/mockData';
import { useCart } from '../context/CartContext';
import type { Book } from '../types';
import BookSection from '../components/BookSection';

const BookDetails = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { addToCart, cartItems, updateQuantity } = useCart();
    const [book, setBook] = useState<Book | null>(null);
    const [selectedImage, setSelectedImage] = useState<string>('');
    const [selectedFormat, setSelectedFormat] = useState('Paperback');
    const [pincode, setPincode] = useState('');

    useEffect(() => {
        const allBooks = [...newArrivals, ...hotDeals, ...genreBooks];
        const foundBook = allBooks.find(b => b.id === Number(id));

        if (foundBook) {
            setBook(foundBook);
            setSelectedImage(foundBook.image);
            if (foundBook.formats && foundBook.formats.length > 0) {
                setSelectedFormat(foundBook.formats[0]);
            }
        }
    }, [id]);

    if (!book) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    const cartItem = cartItems.find(item => item.id === book.id);
    const quantityInCart = cartItem?.quantity || 0;

    const handleIncrement = () => {
        if (quantityInCart === 0) {
            addToCart(book);
        } else {
            updateQuantity(book.id, quantityInCart + 1);
        }
    };

    const handleDecrement = () => {
        if (quantityInCart > 0) {
            updateQuantity(book.id, quantityInCart - 1);
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen pb-12">
            {/* Breadcrumb */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex items-center text-sm text-gray-500">
                    <span className="cursor-pointer hover:text-red-500" onClick={() => navigate('/')}>Home</span>
                    <ChevronRight className="h-4 w-4 mx-2" />
                    <span className="cursor-pointer hover:text-red-500">Books</span>
                    <ChevronRight className="h-4 w-4 mx-2" />
                    <span className="text-gray-900 font-medium truncate">{book.title}</span>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Left Column - Images */}
                        <div className="space-y-4">
                            <div className="aspect-[3/4] bg-gray-100 rounded-xl overflow-hidden relative group">
                                <img
                                    src={selectedImage}
                                    alt={book.title}
                                    className="w-full h-full object-cover"
                                />
                                <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors">
                                    <Heart className={`h-6 w-6 ${book.isLiked ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                                </button>
                                <button className="absolute top-4 left-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors">
                                    <Share2 className="h-6 w-6 text-gray-600" />
                                </button>
                            </div>
                            {/* Thumbnails */}
                            <div className="flex gap-4 overflow-x-auto pb-2">
                                {[book.image, ...(book.images || [])].map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedImage(img)}
                                        className={`relative w-20 h-24 flex-shrink-0 rounded-lg overflow-hidden border-2 ${selectedImage === img ? 'border-red-500' : 'border-transparent'
                                            }`}
                                    >
                                        <img src={img} alt="" className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Right Column - Details */}
                        <div className="flex flex-col">
                            <div className="mb-6">
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">{book.title}</h1>
                                <p className="text-lg text-gray-600 mb-4">by <span className="text-red-500 font-medium">{book.author}</span></p>

                                <div className="flex items-center gap-4 mb-4">
                                    <div className="flex items-center bg-green-100 px-2 py-1 rounded">
                                        <span className="text-green-700 font-bold mr-1">{book.rating}</span>
                                        <Star className="h-4 w-4 text-green-700 fill-current" />
                                    </div>
                                    <span className="text-gray-500 text-sm">{book.reviews.toLocaleString()} Reviews</span>
                                    <span className="text-gray-300">|</span>
                                    <span className="text-green-600 text-sm font-medium">In Stock</span>
                                </div>

                                <div className="flex items-baseline gap-4 mb-6">
                                    <span className="text-4xl font-bold text-gray-900">₹{book.price}</span>
                                    <span className="text-xl text-gray-400 line-through">₹{book.originalPrice}</span>
                                    <span className="text-green-600 font-bold bg-green-50 px-2 py-1 rounded">{book.discount}% OFF</span>
                                </div>
                            </div>

                            {/* Format Selection */}
                            <div className="mb-8">
                                <h3 className="text-sm font-medium text-gray-900 mb-3">Select Format</h3>
                                <div className="flex flex-wrap gap-3">
                                    {book.formats?.map((format) => (
                                        <button
                                            key={format}
                                            onClick={() => setSelectedFormat(format)}
                                            className={`px-4 py-2 rounded-lg border font-medium transition-all ${selectedFormat === format
                                                ? 'bg-[#00508A] text-white border-[#00508A]'
                                                : 'bg-white text-[#00508A] border-gray-200 hover:border-[#00508A]'
                                                }`}
                                        >
                                            {format}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Description */}
                            <div className="mb-8">
                                <h3 className="text-sm font-medium text-gray-900 mb-2">Description</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {book.description || "Experience a compelling narrative that weaves together intricate characters and a gripping plot. This book has captivated readers with its profound themes and masterful storytelling. A must-read for enthusiasts of the genre."}
                                </p>
                            </div>

                            {/* Delivery Check */}
                            <div className="mb-8 p-4 bg-gray-50 rounded-xl border border-gray-100">
                                <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
                                    <Truck className="h-4 w-4" /> Delivery Options
                                </h3>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="Enter Pincode"
                                        value={pincode}
                                        onChange={(e) => setPincode(e.target.value)}
                                        className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-[#00508A] focus:border-transparent outline-none"
                                        maxLength={6}
                                    />
                                    <button className="text-[#00508A] font-medium text-sm px-4 hover:bg-[#CCEAFF]/50 rounded-lg transition-colors">
                                        Check
                                    </button>
                                </div>
                                <div className="mt-3 flex items-center gap-4 text-xs text-gray-500">
                                    <span className="flex items-center gap-1"><ShieldCheck className="h-3 w-3" /> 100% Original</span>
                                    <span className="flex items-center gap-1"><Truck className="h-3 w-3" /> Free Delivery</span>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-4 mt-auto">
                                {quantityInCart > 0 ? (
                                    <div className="flex-1 flex items-center justify-between bg-white border border-red-300 rounded-xl px-4 py-3">
                                        <button onClick={handleDecrement} className="p-1 hover:bg-red-50 text-red-500 rounded transition-colors">
                                            <Minus className="h-5 w-5" />
                                        </button>
                                        <span className="font-bold text-lg text-gray-900">{quantityInCart}</span>
                                        <button onClick={handleIncrement} className="p-1 hover:bg-red-50 text-red-500 rounded transition-colors">
                                            <Plus className="h-5 w-5" />
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => addToCart(book)}
                                        className="flex-1 bg-white border border-red-300 text-red-500 py-3.5 rounded-xl font-bold hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
                                    >
                                        <ShoppingCart className="h-5 w-5" />
                                        Add to Cart
                                    </button>
                                )}
                                <button className="flex-1 bg-[#CCEAFF] text-[#00508A] py-3.5 rounded-xl font-bold hover:bg-[#CCEAFF]/80 transition-colors shadow-sm">
                                    Buy Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Similar Books */}
                <div className="mt-12">
                    <BookSection
                        title="Similar Books"
                        books={genreBooks.filter(b => b.id !== book.id).slice(0, 5)}
                    />
                </div>
            </div>
        </div>
    );
};

export default BookDetails;
