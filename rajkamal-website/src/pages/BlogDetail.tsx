import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Tag, ChevronRight, Share2, Twitter, Facebook, Link2, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import { blogPosts, type BlogPost } from '../data/blogData';
import BlogCard from '../components/BlogCard';
import { 
    newArrivals, 
    hotDeals, 
    genreBooks, 
    bestSellers, 
    superSavingCombos, 
    shopByPriceBooks, 
    examPrepBooks, 
    peopleAlsoBought 
} from '../data/mockData';
import type { Book } from '../types';

const categoryColors: Record<string, string> = {
    'Book Reviews': 'bg-[#C41E3A]',
    'Author Interviews': 'bg-[#00508A]',
    'Literary News': 'bg-amber-600',
    'Writing Tips': 'bg-emerald-600',
    'Events': 'bg-purple-600',
};

const getRecommendedBooks = (post: BlogPost): Book[] => {
    const postTags = post.tags.map(t => t.toLowerCase());
    const postTitle = post.title.toLowerCase();
    const postExcerpt = post.excerpt.toLowerCase();
    
    const allBooks = [
        ...newArrivals,
        ...hotDeals,
        ...genreBooks,
        ...bestSellers,
        ...superSavingCombos,
        ...shopByPriceBooks,
        ...examPrepBooks,
        ...peopleAlsoBought
    ];
    
    // Deduplicate by title to ensure unique entries
    const uniqueBooksMap = new Map<string, Book>();
    allBooks.forEach(book => {
        const titleKey = book.title.trim().toLowerCase();
        if (!uniqueBooksMap.has(titleKey)) {
            uniqueBooksMap.set(titleKey, book);
        }
    });
    const uniqueBooksList = Array.from(uniqueBooksMap.values());
    
    // Filter books that match post's tags, title, or authors mentioned
    let matched = uniqueBooksList.filter(book => {
        const title = book.title.toLowerCase();
        const author = book.author.toLowerCase();
        const desc = (book.description || '').toLowerCase();
        
        const matchesTag = postTags.some(tag => 
            title.includes(tag) || 
            author.includes(tag) || 
            desc.includes(tag)
        );
        
        const matchesPostContent = postTitle.includes(title) || postExcerpt.includes(title);
        
        return matchesTag || matchesPostContent;
    });
    
    // Backfill with category-appropriate list if not enough matches
    if (matched.length < 3) {
        let backfillSource: Book[] = [];
        if (post.category === 'Book Reviews') {
            backfillSource = bestSellers;
        } else if (post.category === 'Events') {
            backfillSource = superSavingCombos;
        } else if (post.category === 'Writing Tips') {
            backfillSource = genreBooks;
        } else if (post.category === 'Literary News') {
            backfillSource = hotDeals;
        } else {
            backfillSource = newArrivals;
        }
        
        for (const book of backfillSource) {
            if (matched.length >= 3) break;
            const alreadyAdded = matched.some(m => m.title.trim().toLowerCase() === book.title.trim().toLowerCase());
            if (!alreadyAdded) {
                matched.push(book);
            }
        }
    }
    
    // Final backfill from all books to ensure we always have 3 books
    if (matched.length < 3) {
        for (const book of uniqueBooksList) {
            if (matched.length >= 3) break;
            const alreadyAdded = matched.some(m => m.title.trim().toLowerCase() === book.title.trim().toLowerCase());
            if (!alreadyAdded) {
                matched.push(book);
            }
        }
    }
    
    return matched.slice(0, 3);
};

const bookTitlesToMatch = ['Godan', 'Rashmirathi', 'Nirmala', 'Gaban', 'Rag Darbari', 'Aapka Bunti', 'Tamas', 'Sofi Ka Sansar'];

const findReferencedBook = (paragraph: string): Book | null => {
    const allBooks = [
        ...newArrivals,
        ...hotDeals,
        ...genreBooks,
        ...bestSellers,
        ...superSavingCombos,
        ...shopByPriceBooks,
        ...examPrepBooks,
        ...peopleAlsoBought
    ];
    
    for (const title of bookTitlesToMatch) {
        if (
            paragraph.includes(`'${title}'`) || 
            paragraph.includes(`"${title}"`) || 
            paragraph.toLowerCase().includes(` ${title.toLowerCase()} `) ||
            paragraph.toLowerCase().includes(` ${title.toLowerCase()},`) ||
            paragraph.toLowerCase().includes(` ${title.toLowerCase()}.`)
        ) {
            const matchedBook = allBooks.find(b => b.title.toLowerCase() === title.toLowerCase());
            if (matchedBook) return matchedBook;
        }
    }
    return null;
};

const postIllustrations: Record<number, Record<number, { url: string; caption: string }>> = {
    1: { // Post 1: Premchand
        0: {
            url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop",
            caption: "The rural landscapes of Varanasi, India, which deeply inspired Munshi Premchand's writing."
        }
    },
    2: { // Post 2: Arundhati Roy
        1: {
            url: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&auto=format&fit=crop",
            caption: "The slow and patient craft of literary writing."
        }
    },
    4: { // Post 4: Habits of Writers
        0: {
            url: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=800&auto=format&fit=crop",
            caption: "A curated collection representing diverse, multi-disciplinary reading habits."
        }
    },
    5: { // Post 5: Kitab Utsav
        0: {
            url: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&auto=format&fit=crop",
            caption: "Kitab Utsav brings together thousands of avid book lovers and leading authors annually."
        }
    },
    10: { // Post 10: World Book Day
        1: {
            url: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&auto=format&fit=crop",
            caption: "Community libraries and reading groups celebrating the power of books."
        }
    }
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
    const recommendedBooks = getRecommendedBooks(post);

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
                        <div className="prose prose-gray max-w-none space-y-8">
                            {post.content.map((para, i) => {
                                const illustration = postIllustrations[post.id]?.[i];
                                const refBook = findReferencedBook(para);
                                
                                return (
                                    <div key={i} className="space-y-6">
                                        <p className="text-gray-700 leading-8 text-base md:text-[17px]">
                                            {para}
                                        </p>
                                        
                                        {/* Dynamic referenced book highlights */}
                                        {refBook && (
                                            <div className="my-8 p-5 bg-gradient-to-r from-red-50/50 to-amber-50/30 rounded-2xl border border-red-100/60 shadow-sm flex flex-col sm:flex-row gap-5 items-center">
                                                <div className="w-24 h-36 flex-shrink-0 bg-white rounded-lg shadow-md overflow-hidden relative border border-gray-100">
                                                    <img 
                                                        src={refBook.image} 
                                                        alt={refBook.title} 
                                                        className="w-full h-full object-cover" 
                                                    />
                                                    {refBook.discount > 0 && (
                                                        <span className="absolute top-1 left-1 bg-red-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                                                            -{refBook.discount}%
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="flex-1 min-w-0 text-center sm:text-left">
                                                    <span className="inline-block px-2.5 py-0.5 bg-red-100 text-[#C41E3A] text-[9px] font-extrabold uppercase rounded-full tracking-wider mb-2">
                                                        Featured Book Reference
                                                    </span>
                                                    <h4 className="text-base font-bold text-gray-900 leading-tight">
                                                        {refBook.title}
                                                    </h4>
                                                    <p className="text-xs text-gray-500 mt-1">
                                                        by {refBook.author.includes(',') ? refBook.author.split(',').pop()?.trim() : refBook.author}
                                                    </p>
                                                    <p className="text-xs text-gray-600 mt-2 line-clamp-2 leading-relaxed">
                                                        {refBook.description || "A canonical work of literature discussed in the article above. Available now on Rajkamal."}
                                                    </p>
                                                    <div className="mt-3 flex items-center justify-center sm:justify-start gap-4">
                                                        <div className="flex items-center gap-1.5">
                                                            <span className="text-sm font-bold text-[#C41E3A]">₹{refBook.price}</span>
                                                            {refBook.originalPrice > refBook.price && (
                                                                <span className="text-xs text-gray-400 line-through">₹{refBook.originalPrice}</span>
                                                            )}
                                                        </div>
                                                        <Link 
                                                            to={`/book/${refBook.id}`} 
                                                            className="text-xs font-bold text-[#C41E3A] hover:text-red-700 transition-colors flex items-center gap-1 hover:underline"
                                                        >
                                                            View details &rarr;
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        
                                        {/* Optional beautiful illustrative images */}
                                        {illustration && (
                                            <div className="my-8 rounded-2xl overflow-hidden shadow-md border border-gray-100 bg-white p-2">
                                                <img 
                                                    src={illustration.url} 
                                                    alt={illustration.caption} 
                                                    className="w-full h-[320px] object-cover rounded-xl"
                                                />
                                                <p className="text-xs text-gray-500 italic mt-2 text-center px-4">
                                                    {illustration.caption}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
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
                    <aside className="lg:sticky lg:top-24 self-start space-y-8">
                        {/* Recommended Books Card */}
                        {recommendedBooks.length > 0 && (
                            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                                <div className="flex items-center gap-2 mb-4 border-b border-gray-100 pb-3">
                                    <BookOpen className="w-4 h-4 text-[#C41E3A]" />
                                    <p className="text-xs font-bold uppercase tracking-widest text-gray-800">Recommended Books</p>
                                </div>
                                <div className="space-y-4">
                                    {recommendedBooks.map((book) => {
                                        const cleanAuthor = book.author.includes(',')
                                            ? book.author.split(',').pop()?.trim()
                                            : book.author;
                                        return (
                                            <Link
                                                to={`/book/${book.id}`}
                                                key={book.id}
                                                className="flex gap-3 group items-start border-b border-gray-100 pb-3 last:border-0 last:pb-0"
                                            >
                                                <div className="relative w-14 h-20 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0 shadow-sm group-hover:shadow transition-shadow">
                                                    <img
                                                        src={book.image}
                                                        alt={book.title}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                        onError={(e) => {
                                                            (e.target as HTMLImageElement).src =
                                                                'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=120&h=160&fit=crop';
                                                        }}
                                                    />
                                                    {book.discount > 0 && (
                                                        <span className="absolute top-1 left-1 bg-red-600 text-white text-[8px] font-bold px-1 py-0.5 rounded">
                                                            -{book.discount}%
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <p className="text-xs font-bold text-gray-900 line-clamp-2 group-hover:text-[#C41E3A] transition-colors leading-tight">
                                                        {book.title}
                                                    </p>
                                                    <p className="text-[10px] text-gray-500 mt-0.5 truncate">
                                                        by {cleanAuthor}
                                                    </p>
                                                    
                                                    {/* Rating */}
                                                    <div className="flex items-center gap-1 mt-1">
                                                        <div className="flex items-center text-yellow-500">
                                                            <span className="text-[10px] font-semibold">{book.rating}</span>
                                                            <svg className="w-2.5 h-2.5 fill-current ml-0.5 text-yellow-400" viewBox="0 0 24 24">
                                                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                                            </svg>
                                                        </div>
                                                        <span className="text-[9px] text-gray-400">({book.reviews})</span>
                                                    </div>

                                                    {/* Pricing */}
                                                    <div className="flex items-center gap-1.5 mt-1.5">
                                                        <span className="text-xs font-bold text-[#C41E3A]">₹{book.price}</span>
                                                        {book.originalPrice > book.price && (
                                                            <span className="text-[10px] text-gray-400 line-through">₹{book.originalPrice}</span>
                                                        )}
                                                    </div>
                                                </div>
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

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
