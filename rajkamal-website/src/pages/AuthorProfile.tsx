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

            {/* Minimalist Pill-Based Identity Card */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 pt-4">
                <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-8 md:p-10 relative z-10">
                        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
                            {/* Balanced Profile Image */}
                            <div className="w-full md:w-60 h-60 md:h-60 rounded-2xl overflow-hidden border-4 border-gray-50 shadow-xl flex-shrink-0 bg-gray-50">
                                <img
                                    src={authorInfo.image}
                                    alt={authorName}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Minimalist Content (Right) */}
                            <div className="flex-1 w-full text-left">
                                <div className="flex flex-col gap-6">
                                    <div>
                                        <div className="flex items-center gap-4 mb-2">
                                            <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight">{authorName}</h1>
                                            <div className="hidden lg:flex items-center gap-1 bg-orange-50 text-orange-600 px-3 py-1 rounded-full text-[10px] font-black border border-orange-100">
                                                <Star className="h-3 w-3 fill-current" />
                                                <span className="uppercase tracking-widest">TOP RATED</span>
                                            </div>
                                        </div>
                                        <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-2xl font-medium">
                                            {authorInfo.description}
                                        </p>
                                    </div>

                                    {/* Literary Focus Tags */}
                                    <div className="flex flex-wrap gap-1.5">
                                        {['Hindi Literature', 'Fiction', 'Classic', 'Epic Realism', 'Social Reform'].map((tag) => (
                                            <span key={tag} className="bg-gray-50 text-gray-400 px-3 py-1.5 rounded-lg text-[10px] font-bold tracking-wider uppercase border border-gray-100">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Compact Metrics & Achievements (Blue Pills) */}
                                    <div className="flex flex-wrap gap-2 pt-1">
                                        {[
                                            { label: 'Books', val: totalBooks, icon: BookOpen },
                                            { label: 'Rating', val: avgRating, icon: Star },
                                            { label: 'Readers', val: '1.2M+', icon: Users },
                                            { label: 'Reviews', val: formatCount(totalReviews), icon: Award },
                                            { label: 'Sahitya Akademi', val: 'Honored', icon: Award },
                                            { label: 'Bestseller', val: 'National', icon: Star },
                                            { label: 'Cultural Icon', val: 'Heritage', icon: Users },
                                            { label: 'Editor\'s Choice', val: 'Top Pick', icon: Award }
                                        ].map((stat, i) => (
                                            <div key={i} className="flex items-center gap-2 bg-[#CCEAFF]/40 text-[#00508A] px-3.5 py-2 rounded-xl text-[10px] font-black border border-[#CCEAFF]/60 hover:bg-[#CCEAFF]/60 transition-colors cursor-default">
                                                <stat.icon className="h-3 w-3" />
                                                <span className="opacity-60">{stat.label}:</span>
                                                <span className="tracking-tight">{stat.val}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Actions Row */}
                                    <div className="flex flex-wrap gap-3 mt-2">
                                        <button className="bg-[#D93025] text-white px-8 py-3.5 rounded-xl font-black hover:bg-[#B92015] transition-all transform hover:scale-[1.02] shadow-xl shadow-red-100 text-xs tracking-[0.15em] uppercase">
                                            FOLLOW AUTHOR
                                        </button>
                                        <button className="border-2 border-gray-100 text-gray-400 font-bold px-8 py-3.5 rounded-xl hover:bg-gray-50 hover:text-gray-600 transition-all text-[11px] tracking-[0.15em] uppercase flex items-center justify-center gap-2">
                                            MEDIA KIT
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Books Section */}
                <div className="pt-8">
                    <div className="flex items-center justify-between mb-12">
                        <div className="flex items-center gap-5">
                            <div className="w-2.5 h-10 bg-red-500 rounded-full" />
                            <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight">Books by <span className="text-[#00508A]">{authorName}</span></h2>
                        </div>
                        <div className="hidden sm:flex items-center gap-3 bg-[#CCEAFF]/50 text-[#00508A] px-6 py-3 rounded-2xl border border-[#CCEAFF]">
                            <span className="text-2xl font-black">{totalBooks}</span>
                            <span className="text-xs font-black uppercase tracking-widest mt-0.5">Collections</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
                        {authorBooks.map((book) => (
                            <BookCard key={book.id} book={book} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthorProfile;
