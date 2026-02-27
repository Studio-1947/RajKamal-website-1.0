import { Link } from 'react-router-dom';
import { ChevronRight, Users, BookOpen } from 'lucide-react';
import { getAllAuthors } from '../data/authorHelpers';

const Authors = () => {
    const authors = getAllAuthors();

    return (
        <div className="bg-gray-50 min-h-screen pb-12">
            {/* Breadcrumb */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex items-center text-sm text-gray-500">
                    <Link to="/" className="hover:text-red-500 hover:underline">Home</Link>
                    <ChevronRight className="h-4 w-4 mx-2" />
                    <span className="text-gray-900 font-medium">Authors</span>
                </div>
            </div>

            {/* Header */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
                <div className="bg-gradient-to-r from-[#00508A] to-[#0070b8] rounded-2xl p-8 md:p-12 text-white relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-4 left-10 w-32 h-32 border border-white/30 rounded-full" />
                        <div className="absolute bottom-2 right-20 w-48 h-48 border border-white/20 rounded-full" />
                        <div className="absolute top-10 right-40 w-20 h-20 border border-white/25 rounded-full" />
                    </div>

                    <div className="relative z-10 flex items-center justify-center flex-col text-center">
                        <div className="bg-white/20 p-4 rounded-full backdrop-blur-sm mb-4">
                            <Users className="h-10 w-10 text-white" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Authors</h1>
                        <p className="text-white/80 max-w-2xl text-lg">
                            Discover the brilliant minds behind our collection. Explore their literary journeys and acclaimed works.
                        </p>
                    </div>
                </div>
            </div>

            {/* Authors Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {authors.map((author) => (
                        <Link
                            key={author.name}
                            to={`/author/${encodeURIComponent(author.name)}`}
                            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-red-200 transition-all group flex flex-col h-full"
                        >
                            <div className="flex flex-col items-center text-center">
                                <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-transparent group-hover:border-red-500 transition-colors">
                                    <img
                                        src={author.image}
                                        alt={author.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#00508A] transition-colors">{author.name}</h2>
                                <p className="text-sm text-gray-500 line-clamp-3 mb-4 flex-grow">
                                    {author.description}
                                </p>

                                <div className="mt-auto pt-4 border-t border-gray-100 w-full flex items-center justify-between">
                                    <div className="flex items-center text-red-500 font-medium text-sm">
                                        <BookOpen className="h-4 w-4 mr-1.5" />
                                        {author.bookCount} {author.bookCount === 1 ? 'Book' : 'Books'}
                                    </div>
                                    <div className="text-[#00508A] bg-[#CCEAFF] px-3 py-1 rounded-full text-xs font-bold group-hover:bg-[#00508A] group-hover:text-white transition-colors">
                                        View Profile
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {authors.length === 0 && (
                    <div className="text-center py-12">
                        <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900">No authors found</h3>
                        <p className="text-gray-500">Check back later for our author lineup.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Authors;
