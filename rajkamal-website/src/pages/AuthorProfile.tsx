import { useParams, useNavigate, Link } from 'react-router-dom';
import { ChevronRight, Star, BookOpen, Users, Award } from 'lucide-react';
import { getAuthorBooks, getAuthorInfo } from '../data/authorHelpers';
import BookCard from '../components/BookCard';

const AuthorProfile = () => {
    const { name } = useParams<{ name: string }>();
    const navigate = useNavigate();
    const authorName = decodeURIComponent(name || '');
    const authorBooks = getAuthorBooks(authorName);
    const authorInfo = getAuthorInfo(authorName);

    if (!authorName || authorBooks.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
                <BookOpen className="h-16 w-16 text-gray-300 mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Author Not Found</h2>
                <p className="text-gray-500 mb-6">We couldn't find any books by this author.</p>
                <button
                    onClick={() => navigate('/')}
                    className="bg-[#00508A] text-white px-6 py-2 rounded-full font-medium hover:bg-[#003d6b] transition-colors"
                >
                    Back to Home
                </button>
            </div>
        );
    }

    // Compute stats
    const totalBooks = authorBooks.length;
    const avgRating = (authorBooks.reduce((sum, b) => sum + b.rating, 0) / totalBooks).toFixed(1);
    const totalReviews = authorBooks.reduce((sum, b) => sum + b.reviews, 0);

    const formatCount = (count: number): string => {
        if (count >= 1000) {
            const k = count / 1000;
            return k % 1 === 0 ? `${k}k` : `${parseFloat(k.toFixed(1))}k`;
        }
        return count.toString();
    };

    return (
        <div className="bg-gray-50 min-h-screen pb-12">
            {/* Breadcrumb */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex items-center text-sm text-gray-500">
                    <span className="cursor-pointer hover:text-red-500" onClick={() => navigate('/')}>Home</span>
                    <ChevronRight className="h-4 w-4 mx-2" />
                    <Link to="/authors" className="hover:text-red-500">Authors</Link>
                    <ChevronRight className="h-4 w-4 mx-2" />
                    <span className="text-gray-900 font-medium truncate">{authorName}</span>
                </div>
            </div>

            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
                <div className="relative bg-white rounded-2xl shadow-sm overflow-hidden">
                    {/* Gradient Banner */}
                    <div className="h-48 md:h-56 bg-gradient-to-r from-[#00508A] via-[#0070b8] to-[#00508A] relative overflow-hidden">
                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute top-4 left-10 w-32 h-32 border border-white/30 rounded-full" />
                            <div className="absolute bottom-2 right-20 w-48 h-48 border border-white/20 rounded-full" />
                            <div className="absolute top-10 right-40 w-20 h-20 border border-white/25 rounded-full" />
                        </div>
                    </div>

                    {/* Author Info Overlay */}
                    <div className="px-6 md:px-10 pb-8 -mt-16 relative z-10">
                        <div className="flex flex-col md:flex-row items-start md:items-end gap-6">
                            {/* Author Image */}
                            <div className="w-32 h-32 md:w-36 md:h-36 rounded-2xl overflow-hidden border-4 border-white shadow-lg flex-shrink-0 bg-gray-100">
                                <img
                                    src={authorInfo.image}
                                    alt={authorName}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Author Name & Bio */}
                            <div className="flex-1 pt-2 md:pt-0">
                                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{authorName}</h1>
                                <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-2xl">
                                    {authorInfo.description}
                                </p>
                            </div>

                            {/* Follow Button */}
                            <button className="bg-[#00508A] text-white px-6 py-2.5 rounded-full font-medium hover:bg-[#003d6b] transition-colors flex-shrink-0 text-sm">
                                Follow Author
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
                <div className="grid grid-cols-3 gap-4 md:gap-6">
                    <div className="bg-white rounded-xl p-5 text-center shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="inline-flex items-center justify-center w-10 h-10 bg-[#CCEAFF] rounded-full mb-3">
                            <BookOpen className="h-5 w-5 text-[#00508A]" />
                        </div>
                        <p className="text-2xl md:text-3xl font-bold text-gray-900">{totalBooks}</p>
                        <p className="text-xs md:text-sm text-gray-500 font-medium">Published Books</p>
                    </div>
                    <div className="bg-white rounded-xl p-5 text-center shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="inline-flex items-center justify-center w-10 h-10 bg-red-50 rounded-full mb-3">
                            <Star className="h-5 w-5 text-red-500 fill-current" />
                        </div>
                        <p className="text-2xl md:text-3xl font-bold text-gray-900">{avgRating}</p>
                        <p className="text-xs md:text-sm text-gray-500 font-medium">Avg. Rating</p>
                    </div>
                    <div className="bg-white rounded-xl p-5 text-center shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="inline-flex items-center justify-center w-10 h-10 bg-green-50 rounded-full mb-3">
                            <Users className="h-5 w-5 text-green-600" />
                        </div>
                        <p className="text-2xl md:text-3xl font-bold text-gray-900">{formatCount(totalReviews)}</p>
                        <p className="text-xs md:text-sm text-gray-500 font-medium">Total Reviews</p>
                    </div>
                </div>
            </div>

            {/* About Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
                <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-1 h-6 bg-red-500 rounded-full" />
                        <h2 className="text-xl md:text-2xl font-bold text-gray-900">About {authorName}</h2>
                    </div>
                    <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                        {authorInfo.description}
                    </p>
                    <div className="mt-6 flex flex-wrap gap-3">
                        <span className="bg-[#CCEAFF] text-[#00508A] px-4 py-1.5 rounded-full text-xs font-medium">Hindi Literature</span>
                        <span className="bg-red-50 text-red-500 px-4 py-1.5 rounded-full text-xs font-medium">Fiction</span>
                        <span className="bg-green-50 text-green-600 px-4 py-1.5 rounded-full text-xs font-medium">Classic</span>
                    </div>
                </div>
            </div>

            {/* Achievements Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
                <div className="bg-gradient-to-r from-[#00508A] to-[#0070b8] rounded-2xl p-6 md:p-8 text-white">
                    <div className="flex items-center gap-3 mb-4">
                        <Award className="h-6 w-6" />
                        <h2 className="text-xl md:text-2xl font-bold">Literary Achievements</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                            <p className="font-bold text-lg mb-1">Sahitya Akademi</p>
                            <p className="text-white/70 text-sm">Award for exceptional contribution to Hindi literature</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                            <p className="font-bold text-lg mb-1">National Bestseller</p>
                            <p className="text-white/70 text-sm">Multiple works recognized as national bestsellers</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                            <p className="font-bold text-lg mb-1">Cultural Icon</p>
                            <p className="text-white/70 text-sm">Widely studied in universities across India</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Books by Author */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-1 h-6 bg-red-500 rounded-full" />
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900">Books by {authorName}</h2>
                    <span className="ml-auto bg-[#CCEAFF] text-[#00508A] px-3 py-1 rounded-full text-xs font-bold">{totalBooks} Books</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {authorBooks.map((book) => (
                        <BookCard key={book.id} book={book} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AuthorProfile;
