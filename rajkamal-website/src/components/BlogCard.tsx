import { Clock, User } from 'lucide-react';
import type { BlogPost } from '../data/blogData';

const categoryColors: Record<string, string> = {
    'Book Reviews': 'bg-[#C41E3A] text-white',
    'Author Interviews': 'bg-[#00508A] text-white',
    'Literary News': 'bg-amber-600 text-white',
    'Writing Tips': 'bg-emerald-600 text-white',
    'Events': 'bg-purple-600 text-white',
};

interface BlogCardProps {
    post: BlogPost;
    variant?: 'default' | 'featured';
}

const BlogCard: React.FC<BlogCardProps> = ({ post, variant = 'default' }) => {
    const badgeClass = categoryColors[post.category] ?? 'bg-gray-700 text-white';

    if (variant === 'featured') {
        return (
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all group cursor-pointer lg:grid lg:grid-cols-2">
                <div className="relative overflow-hidden h-64 lg:h-auto">
                    <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className={`absolute top-4 left-4 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${badgeClass}`}>
                        {post.category}
                    </span>
                    <span className="absolute top-4 right-4 bg-black/60 text-white text-[10px] font-medium px-2.5 py-1 rounded-full backdrop-blur-sm">
                        Featured
                    </span>
                </div>
                <div className="p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="text-xs text-gray-400">{post.date}</span>
                        <span className="w-1 h-1 rounded-full bg-gray-300" />
                        <span className="flex items-center gap-1 text-xs text-gray-400">
                            <Clock className="w-3 h-3" />
                            {post.readTime} min read
                        </span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 leading-snug mb-2 group-hover:text-[#C41E3A] transition-colors">
                        {post.title}
                    </h2>
                    {post.titleHindi && (
                        <p className="text-sm text-[#C41E3A] font-medium mb-3">{post.titleHindi}</p>
                    )}
                    <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">
                        {post.excerpt}
                    </p>
                    <div className="flex items-center gap-3">
                        <img
                            src={post.authorImage}
                            alt={post.author}
                            className="w-9 h-9 rounded-full object-cover border border-gray-200"
                        />
                        <div>
                            <p className="text-sm font-semibold text-gray-800">{post.author}</p>
                            <p className="text-xs text-gray-400">{post.authorRole}</p>
                        </div>
                        <button className="ml-auto text-sm font-semibold text-[#C41E3A] hover:underline">
                            Read More →
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md hover:border-red-100 transition-all group cursor-pointer flex flex-col h-full">
            <div className="relative overflow-hidden h-48">
                <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className={`absolute top-3 left-3 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${badgeClass}`}>
                    {post.category}
                </span>
            </div>
            <div className="p-5 flex flex-col flex-grow">
                <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs text-gray-400">{post.date}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-200" />
                    <span className="flex items-center gap-1 text-xs text-gray-400">
                        <Clock className="w-3 h-3" />
                        {post.readTime} min
                    </span>
                </div>
                <h3 className="text-base font-bold text-gray-900 leading-snug mb-1 line-clamp-2 group-hover:text-[#C41E3A] transition-colors flex-grow">
                    {post.title}
                </h3>
                {post.titleHindi && (
                    <p className="text-xs text-[#C41E3A] font-medium mb-2 line-clamp-1">{post.titleHindi}</p>
                )}
                <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 mb-4">
                    {post.excerpt}
                </p>
                <div className="flex items-center gap-2 mt-auto pt-4 border-t border-gray-100">
                    <img
                        src={post.authorImage}
                        alt={post.author}
                        className="w-7 h-7 rounded-full object-cover border border-gray-200"
                    />
                    <div className="flex-grow min-w-0">
                        <p className="text-xs font-semibold text-gray-700 truncate">{post.author}</p>
                        <p className="text-[10px] text-gray-400 truncate">{post.authorRole}</p>
                    </div>
                    <User className="w-3.5 h-3.5 text-gray-300 flex-shrink-0" />
                </div>
            </div>
        </div>
    );
};

export default BlogCard;
