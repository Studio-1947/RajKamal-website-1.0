import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Star, Heart, Share2, Minus, Plus, ChevronRight, ShoppingCart, Truck, Tag, ThumbsUp, Play } from 'lucide-react';
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
    const [promoCode, setPromoCode] = useState('');

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
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                        {/* Left Column - Images */}
                        <div className="space-y-4 lg:sticky lg:top-24">
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
                                        className={`relative w-20 h-24 flex-shrink-0 rounded-lg overflow-hidden border-2 ${selectedImage === img ? 'border-[#00508A]' : 'border-transparent'
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
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h1 className="text-3xl font-bold text-gray-900 mb-1">{book.title}</h1>
                                        <Link
                                            to={`/author/${encodeURIComponent(book.author.split(',').pop()?.trim() || '')}`}
                                            className="text-lg text-gray-600 mb-2 hover:text-[#00508A] hover:underline"
                                        >
                                            {book.author}
                                        </Link>
                                    </div>
                                    <button className="text-[#00508A] bg-[#CCEAFF] px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                                        <Share2 className="h-3 w-3" /> Share
                                    </button>
                                </div>

                                <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                                    {book.isbn && <span>ISBN: {book.isbn}</span>}
                                    {book.edition && <span>Edition: {book.edition}</span>}
                                </div>

                                <div className="flex items-center gap-4 mb-4">
                                    <div className="flex items-center bg-red-500 text-white px-2 py-0.5 rounded text-sm font-bold">
                                        {book.rating} <Star className="h-3 w-3 ml-1 fill-current" />
                                    </div>
                                    <span className="text-gray-500 text-sm font-medium">{book.reviews.toLocaleString()} user bought this</span>
                                </div>

                                <div className="flex items-baseline gap-3 mb-6">
                                    <span className="text-3xl font-bold text-red-500">₹{book.price}</span>
                                    <span className="text-lg text-gray-400 line-through">₹{book.originalPrice}</span>
                                    <span className="text-green-600 font-bold text-sm">{book.discount}% off</span>
                                </div>
                            </div>

                            {/* Format Selection */}
                            <div className="mb-6">
                                <div className="flex flex-wrap gap-3">
                                    {book.formats?.map((format) => (
                                        <button
                                            key={format}
                                            onClick={() => setSelectedFormat(format)}
                                            className={`px-4 py-1.5 rounded-[10px] text-sm font-medium transition-all ${selectedFormat === format
                                                ? 'bg-[#00508A] text-white border border-[#00508A]'
                                                : 'bg-white text-[#00508A] border border-gray-200 hover:border-[#00508A]'
                                                }`}
                                        >
                                            {format}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-4 mb-8">
                                <button className="flex-1 bg-[#CCEAFF] text-[#00508A] py-3 rounded-lg font-bold hover:bg-[#CCEAFF]/80 transition-colors">
                                    Buy Now
                                </button>
                                {quantityInCart > 0 ? (
                                    <div className="flex-1 flex items-center justify-between bg-white border border-red-300 rounded-lg px-4 py-3">
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
                                        className="flex-1 bg-white border border-red-300 text-red-500 py-3 rounded-lg font-bold hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
                                    >
                                        <ShoppingCart className="h-5 w-5" />
                                        Add to Cart
                                    </button>
                                )}
                            </div>

                            {/* Promo Code */}
                            <div className="mb-8">
                                <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                                    Enter Promo Code <Tag className="h-4 w-4" />
                                </h3>
                                <div className="flex gap-2 mb-3">
                                    <input
                                        type="text"
                                        placeholder="Enter Promo Code"
                                        value={promoCode}
                                        onChange={(e) => setPromoCode(e.target.value)}
                                        className="flex-1 bg-gray-100 border-none rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-[#00508A] outline-none"
                                    />
                                    <button className="text-red-500 font-medium text-sm px-4 hover:bg-red-50 rounded-lg transition-colors">
                                        Apply
                                    </button>
                                </div>
                                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                                    {['RAJ100', 'RAJ200', 'RAJ300'].map((code) => (
                                        <div key={code} className="bg-[#CCEAFF] px-3 py-1 rounded-[50px] text-xs font-medium text-[#00508A] whitespace-nowrap">
                                            {code} <span className="text-gray-500 ml-1">₹{code.replace('RAJ', '')} off</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Delivery Check */}
                            <div className="mb-8">
                                <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                                    Delivery Option <Truck className="h-4 w-4" />
                                </h3>
                                <div className="bg-gray-100 rounded-lg p-1 flex items-center mb-2">
                                    <input
                                        type="text"
                                        placeholder="Enter Pincode"
                                        value={pincode}
                                        onChange={(e) => setPincode(e.target.value)}
                                        className="flex-1 bg-transparent border-none px-4 py-2 text-sm focus:ring-0 outline-none"
                                        maxLength={6}
                                    />
                                    <button className="text-red-500 font-medium text-sm px-4 hover:bg-white rounded-md py-1.5 transition-colors m-1">
                                        Check
                                    </button>
                                </div>
                                <div className="space-y-1 text-xs text-gray-500">
                                    <p>Delivered within 7 days</p>
                                    <p>Delivery Free above ₹1000</p>
                                    <p>100% Original Products</p>
                                    <p>Pay on delivery might be available</p>
                                    <p>Return Available</p>
                                </div>
                            </div>

                            {/* About Book */}
                            <div className="mb-8">
                                <h3 className="text-lg font-bold text-gray-900 mb-2">About Book</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    {book.description || "Experience a compelling narrative that weaves together intricate characters and a gripping plot. This book has captivated readers with its profound themes and masterful storytelling. A must-read for enthusiasts of the genre."}
                                </p>
                            </div>

                            {/* About Author */}
                            <div className="mb-8 bg-gray-50 rounded-xl p-4">
                                <div className="flex items-start gap-4">
                                    <img
                                        src={book.authorImage || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"}
                                        alt={book.author}
                                        className="w-12 h-12 rounded-full object-cover"
                                    />
                                    <div className="flex-1">
                                        <div className="flex justify-between items-center mb-2">
                                            <Link
                                                to={`/author/${encodeURIComponent(book.author.split(',').pop()?.trim() || '')}`}
                                                className="font-bold text-gray-900 hover:text-[#00508A] hover:underline"
                                            >
                                                {book.author.split(',').pop()?.trim()}
                                            </Link>
                                            <Link
                                                to={`/author/${encodeURIComponent(book.author.split(',').pop()?.trim() || '')}`}
                                                className="bg-[#00508A] text-white px-4 py-1 rounded-full text-xs font-medium hover:bg-[#003d6b] transition-colors"
                                            >
                                                Follow
                                            </Link>
                                        </div>
                                        <p className="text-xs text-gray-600 leading-relaxed mb-2">
                                            {book.authorDescription || "A celebrated author known for their vivid storytelling and rich portrayal of life. Their works often explore themes of human relationships and the complexities of society."}
                                        </p>
                                        <Link
                                            to={`/author/${encodeURIComponent(book.author.split(',').pop()?.trim() || '')}`}
                                            className="text-[#00508A] text-xs font-bold hover:underline"
                                        >
                                            View Profile
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/* Reviews */}
                            <div className="mb-8">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Reviews</h3>

                                {/* Write Review */}
                                <div className="bg-gray-100 rounded-xl p-4 mb-6">
                                    <input
                                        type="text"
                                        placeholder="Write a review"
                                        className="w-full bg-transparent border-b border-gray-300 pb-2 mb-3 text-sm focus:outline-none focus:border-[#00508A]"
                                    />
                                    <div className="flex justify-between items-center">
                                        <button className="text-[#00508A] bg-[#CCEAFF] px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-2 hover:bg-[#CCEAFF]/80">
                                            <Tag className="h-3 w-3" /> Attach a Media
                                        </button>
                                        <button className="bg-[#00508A] text-white px-6 py-1.5 rounded-full text-xs font-medium hover:bg-[#003d6b]">
                                            Send
                                        </button>
                                    </div>
                                </div>

                                {/* Review List */}
                                <div className="space-y-6">
                                    {/* Media Gallery from Reviews */}
                                    {book.reviewsList && book.reviewsList.some(r => r.images?.length) && (
                                        <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
                                            {book.reviewsList.flatMap(r => r.images || []).map((img, idx) => (
                                                <div key={idx} className="relative w-24 h-32 flex-shrink-0 rounded-lg overflow-hidden">
                                                    <img src={img} alt="" className="w-full h-full object-cover" />
                                                    {idx === 1 && (
                                                        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                                            <div className="bg-white/80 rounded-full p-1">
                                                                <Play className="h-4 w-4 text-gray-900 fill-current" />
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {book.reviewsList?.map((review) => (
                                        <div key={review.id} className="flex gap-4">
                                            <img
                                                src={review.avatar || "https://via.placeholder.com/40"}
                                                alt={review.user}
                                                className="w-10 h-10 rounded-full object-cover"
                                            />
                                            <div className="flex-1">
                                                <div className="flex justify-between items-start mb-1">
                                                    <h4 className="font-bold text-sm text-gray-900">{review.user}</h4>
                                                    <span className="text-xs text-gray-400">{review.date}</span>
                                                </div>
                                                <p className="text-xs text-gray-600 mb-2">{review.content}</p>
                                                <div className="flex items-center gap-4 text-xs text-gray-500">
                                                    <button className="flex items-center gap-1 hover:text-[#00508A]">
                                                        <ThumbsUp className="h-3 w-3" /> {review.likes}
                                                    </button>
                                                    <button className="flex items-center gap-1 hover:text-[#00508A]">
                                                        <Heart className="h-3 w-3" /> {Math.floor(review.likes / 2)}K
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Similar Books */}
                <div className="mt-12">
                    <BookSection
                        title="Similar Books"
                        books={genreBooks.filter(b => b.id !== book.id).slice(0, 5)}
                        bgClassName="bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-200 rounded-2xl"
                    />
                </div>
            </div>
        </div>
    );
};

export default BookDetails;
