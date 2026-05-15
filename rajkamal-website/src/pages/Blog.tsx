import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, BookOpen, Search } from 'lucide-react';
import { blogPosts, blogCategories } from '../data/blogData';
import BlogCard from '../components/BlogCard';

const Blog = () => {
    const [activeCategory, setActiveCategory] = useState('All Posts');
    const [searchQuery, setSearchQuery] = useState('');

    const featured = blogPosts.find(p => p.featured);

    const filtered = blogPosts.filter(post => {
        const matchesCategory = activeCategory === 'All Posts' || post.category === activeCategory;
        const q = searchQuery.toLowerCase();
        const matchesSearch =
            !q ||
            post.title.toLowerCase().includes(q) ||
            (post.titleHindi ?? '').includes(q) ||
            post.author.toLowerCase().includes(q) ||
            post.tags.some(t => t.toLowerCase().includes(q));
        return matchesCategory && matchesSearch;
    });

    const gridPosts = filtered.filter(p => !p.featured || activeCategory !== 'All Posts' || searchQuery);

    return (
        <div className="bg-gray-50 min-h-screen pb-16">
            {/* Breadcrumb */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex items-center text-sm text-gray-500">
                    <Link to="/" className="hover:text-red-500 hover:underline">Home</Link>
                    <ChevronRight className="h-4 w-4 mx-2" />
                    <span className="text-gray-900 font-medium">Blog</span>
                </div>
            </div>

            {/* Hero Header */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
                <div className="bg-gradient-to-r from-[#8B0000] to-[#C41E3A] rounded-2xl p-8 md:p-12 text-white relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-4 left-10 w-40 h-40 border border-white/30 rounded-full" />
                        <div className="absolute bottom-2 right-16 w-64 h-64 border border-white/20 rounded-full" />
                        <div className="absolute top-10 right-48 w-24 h-24 border border-white/25 rounded-full" />
                        <div className="absolute -bottom-8 left-1/3 w-48 h-48 border border-white/15 rounded-full" />
                    </div>
                    <div className="relative z-10 flex flex-col items-center text-center">
                        <div className="bg-white/20 p-4 rounded-full backdrop-blur-sm mb-5">
                            <BookOpen className="h-10 w-10 text-white" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-3">Our Blog</h1>
                        <p className="text-white/80 max-w-2xl text-lg mb-8">
                            Book reviews, author interviews, literary news, and insights on the craft of writing — all in one place.
                        </p>
                        {/* Search bar inside hero */}
                        <div className="relative w-full max-w-md">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60" />
                            <input
                                type="text"
                                placeholder="Search posts, authors, topics…"
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                className="w-full bg-white/15 border border-white/30 rounded-full py-3 pl-11 pr-5 text-white placeholder-white/60 focus:outline-none focus:bg-white/25 focus:border-white/60 transition-all text-sm"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Category Filters */}
                <div className="flex items-center gap-2 flex-wrap mb-10">
                    {blogCategories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                                activeCategory === cat
                                    ? 'bg-[#F16F6F] text-white shadow-sm'
                                    : 'bg-[#E4B9B9] text-[#714040] hover:bg-[#F16F6F] hover:text-white'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Featured Post — only on "All Posts" with no search */}
                {featured && activeCategory === 'All Posts' && !searchQuery && (
                    <div className="mb-10">
                        <div className="flex items-center gap-2 mb-5">
                            <span className="w-1 h-5 bg-[#C41E3A] rounded-full" />
                            <h2 className="text-xl font-bold text-gray-900">Featured</h2>
                        </div>
                        <BlogCard post={featured} variant="featured" />
                    </div>
                )}

                {/* Section heading for grid */}
                {filtered.length > 0 && (
                    <div className="flex items-center gap-2 mb-6">
                        <span className="w-1 h-5 bg-[#C41E3A] rounded-full" />
                        <h2 className="text-xl font-bold text-gray-900">
                            {activeCategory === 'All Posts' && !searchQuery
                                ? 'Latest Posts'
                                : searchQuery
                                ? `Results for "${searchQuery}"`
                                : activeCategory}
                        </h2>
                        <span className="ml-2 text-sm text-gray-400">({filtered.length})</span>
                    </div>
                )}

                {/* Posts Grid */}
                {filtered.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {(activeCategory === 'All Posts' && !searchQuery ? gridPosts : filtered).map(post => (
                            <BlogCard key={post.id} post={post} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-24">
                        <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500 text-lg font-medium">No posts found</p>
                        <p className="text-gray-400 text-sm mt-1">Try a different category or search term.</p>
                        <button
                            onClick={() => { setActiveCategory('All Posts'); setSearchQuery(''); }}
                            className="mt-6 px-5 py-2.5 bg-[#C41E3A] text-white rounded-full text-sm font-semibold hover:bg-[#a01730] transition-colors"
                        >
                            Clear Filters
                        </button>
                    </div>
                )}

                {/* Newsletter CTA */}
                {filtered.length > 0 && (
                    <div className="mt-16 bg-gradient-to-r from-[#8B0000] to-[#C41E3A] rounded-2xl p-8 md:p-12 text-white text-center relative overflow-hidden">
                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute top-2 left-8 w-32 h-32 border border-white/30 rounded-full" />
                            <div className="absolute bottom-2 right-12 w-48 h-48 border border-white/20 rounded-full" />
                        </div>
                        <div className="relative z-10">
                            <h3 className="text-2xl md:text-3xl font-bold mb-2">Never Miss a Story</h3>
                            <p className="text-white/80 mb-6 text-sm">
                                Get the latest book reviews, author interviews, and literary news delivered to your inbox.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="flex-grow bg-white/15 border border-white/30 rounded-full py-3 px-5 text-white placeholder-white/60 focus:outline-none focus:border-white transition-colors text-sm"
                                />
                                <button className="bg-white text-[#C41E3A] px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors text-sm whitespace-nowrap">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Blog;
