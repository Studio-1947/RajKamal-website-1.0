import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Tag, ChevronRight, Share2, Twitter, Facebook, Link2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { blogPosts } from '../data/blogData';
import BlogCard from '../components/BlogCard';

const categoryColors: Record<string, string> = {
    'Book Reviews': 'bg-[#C41E3A]',
    'Author Interviews': 'bg-[#00508A]',
    'Literary News': 'bg-amber-600',
    'Writing Tips': 'bg-emerald-600',
    'Events': 'bg-purple-600',
};

const BlogDetail = () => {
    const { id } = useParams<{ id: string }>();
    const post = blogPosts.find(p => p.id === Number(id));

    if (!post) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-32 text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Post not found</h2>
                <Link to="/blog" className="text-[#C41E3A] hover:underline font-bold inline-flex items-center gap-2">
                    <ArrowLeft className="h-5 w-5" /> Back to Blog
                </Link>
            </div>
        );
    }

    const related = blogPosts
        .filter(p => p.id !== post.id && p.category === post.category)
        .slice(0, 3);

    const badgeBg = categoryColors[post.category] ?? 'bg-gray-700';

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href);
    };

    return (
        <div className="bg-[#FAFAFA] min-h-screen pb-20">

            {/* Hero */}
            <div className="relative h-[420px] md:h-[560px] w-full overflow-hidden bg-black">
                <motion.img
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1.05, opacity: 0.45 }}
                    transition={{ duration: 1.4 }}
                    src={post.image}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover blur-2xl"
                />
                <motion.img
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    src={post.image}
                    alt={post.title}
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20" />

                <div className="absolute inset-0 flex flex-col justify-between px-4 sm:px-6 lg:px-8 py-6 z-10 max-w-5xl mx-auto w-full left-0 right-0">
                    <motion.div
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <Link
                            to="/blog"
                            className="inline-flex items-center gap-2 text-white/90 hover:text-white bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full text-sm transition-all"
                        >
                            <ArrowLeft className="h-4 w-4" /> Back to Blog
                        </Link>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.55 }}
                        className="space-y-3 pb-2"
                    >
                        <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-white ${badgeBg}`}>
                            {post.category}
                        </span>
                        <h1 className="text-3xl md:text-5xl font-black text-white leading-tight drop-shadow-xl max-w-3xl">
                            {post.title}
                        </h1>
                        {post.titleHindi && (
                            <p className="text-white/70 text-base md:text-lg font-medium">{post.titleHindi}</p>
                        )}
                        <div className="flex items-center gap-4 pt-1">
                            <div className="flex items-center gap-2">
                                <img src={post.authorImage} alt={post.author} className="w-8 h-8 rounded-full object-cover border border-white/30" />
                                <span className="text-white/90 text-sm font-medium">{post.author}</span>
                            </div>
                            <span className="text-white/40">·</span>
                            <span className="text-white/70 text-sm">{post.date}</span>
                            <span className="text-white/40">·</span>
                            <span className="flex items-center gap-1 text-white/70 text-sm">
                                <Clock className="w-3.5 h-3.5" /> {post.readTime} min read
                            </span>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Breadcrumb */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex items-center text-sm text-gray-500">
                    <Link to="/" className="hover:text-red-500 hover:underline">Home</Link>
                    <ChevronRight className="h-4 w-4 mx-1" />
                    <Link to="/blog" className="hover:text-red-500 hover:underline">Blog</Link>
                    <ChevronRight className="h-4 w-4 mx-1" />
                    <span className="text-gray-900 font-medium line-clamp-1">{post.title}</span>
                </div>
            </div>

            {/* Main layout: article + sidebar */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10">

                    {/* Article body */}
                    <article>
                        {/* Excerpt lead */}
                        <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-medium border-l-4 border-[#C41E3A] pl-5 mb-8 italic">
                            {post.excerpt}
                        </p>

                        {/* Content paragraphs */}
                        <div className="prose prose-gray max-w-none space-y-6">
                            {post.content.map((para, i) => (
                                <p key={i} className="text-gray-700 leading-8 text-base md:text-[17px]">
                                    {para}
                                </p>
                            ))}
                        </div>

                        {/* Tags */}
                        <div className="mt-10 pt-8 border-t border-gray-200">
                            <div className="flex items-center gap-2 flex-wrap">
                                <Tag className="w-4 h-4 text-gray-400" />
                                {post.tags.map(tag => (
                                    <span
                                        key={tag}
                                        className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full hover:bg-red-50 hover:text-[#C41E3A] transition-colors cursor-pointer"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Share */}
                        <div className="mt-8 pt-6 border-t border-gray-200">
                            <p className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                <Share2 className="w-4 h-4" /> Share this article
                            </p>
                            <div className="flex gap-3">
                                <a
                                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-4 py-2 bg-black text-white text-xs font-semibold rounded-full hover:bg-gray-800 transition-colors"
                                >
                                    <Twitter className="w-3.5 h-3.5" /> X (Twitter)
                                </a>
                                <a
                                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-4 py-2 bg-[#1877F2] text-white text-xs font-semibold rounded-full hover:bg-[#1665d8] transition-colors"
                                >
                                    <Facebook className="w-3.5 h-3.5" /> Facebook
                                </a>
                                <button
                                    onClick={handleCopyLink}
                                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 text-xs font-semibold rounded-full hover:bg-gray-200 transition-colors"
                                >
                                    <Link2 className="w-3.5 h-3.5" /> Copy Link
                                </button>
                            </div>
                        </div>
                    </article>

                    {/* Sidebar */}
                    <aside className="space-y-8">
                        {/* Author card */}
                        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">About the Author</p>
                            <div className="flex items-center gap-3 mb-3">
                                <img
                                    src={post.authorImage}
                                    alt={post.author}
                                    className="w-14 h-14 rounded-full object-cover border-2 border-gray-100"
                                />
                                <div>
                                    <p className="font-bold text-gray-900">{post.author}</p>
                                    <p className="text-xs text-[#C41E3A] font-medium">{post.authorRole}</p>
                                </div>
                            </div>
                            <p className="text-sm text-gray-500 leading-relaxed">{post.authorBio}</p>
                        </div>

                        {/* Category */}
                        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Category</p>
                            <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-white ${badgeBg}`}>
                                {post.category}
                            </span>
                        </div>

                        {/* More from category */}
                        {related.length > 0 && (
                            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">More in {post.category}</p>
                                <ul className="space-y-4">
                                    {related.map(r => (
                                        <li key={r.id}>
                                            <Link
                                                to={`/blog/${r.id}`}
                                                className="flex gap-3 group"
                                            >
                                                <img
                                                    src={r.image}
                                                    alt={r.title}
                                                    className="w-16 h-14 object-cover rounded-lg flex-shrink-0 group-hover:opacity-80 transition-opacity"
                                                />
                                                <div className="min-w-0">
                                                    <p className="text-sm font-semibold text-gray-800 line-clamp-2 group-hover:text-[#C41E3A] transition-colors leading-snug">
                                                        {r.title}
                                                    </p>
                                                    <p className="text-xs text-gray-400 mt-1">{r.date}</p>
                                                </div>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </aside>
                </div>
            </div>

            {/* Related posts footer section */}
            {related.length > 0 && (
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
                    <div className="flex items-center gap-2 mb-6">
                        <span className="w-1 h-5 bg-[#C41E3A] rounded-full" />
                        <h2 className="text-xl font-bold text-gray-900">You Might Also Like</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {related.map(r => (
                            <BlogCard key={r.id} post={r} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default BlogDetail;
