import { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Filter, X, SlidersHorizontal, Star } from 'lucide-react';
import BookCard from '../components/BookCard';
import { newArrivals, hotDeals, genreBooks, bestSellers, superSavingCombos, shopByPriceBooks, examPrepBooks, peopleAlsoBought } from '../data/mockData';
import type { Book } from '../types';

const getBooksByCategory = (category: string | undefined, brand: string | undefined): { title: string, books: Book[] } => {
    // If brand is provided, filter all books by that brand
    if (brand) {
        const decodedBrand = decodeURIComponent(brand);
        const allBooks = [...newArrivals, ...hotDeals, ...genreBooks, ...bestSellers, ...superSavingCombos, ...shopByPriceBooks, ...examPrepBooks, ...peopleAlsoBought];

        // Remove duplicates by ID
        const uniqueBooks = Array.from(new Map(allBooks.map(item => [item.id, item])).values());

        const filteredBooks = uniqueBooks.filter(book => book.publication === decodedBrand);
        return { title: decodedBrand, books: filteredBooks };
    }

    switch (category) {
        case 'new-arrivals':
            return { title: 'New Arrivals', books: newArrivals };
        case 'hot-deals':
            return { title: 'Hot Deals', books: hotDeals };
        case 'best-sellers':
            return { title: 'Best Sellers', books: bestSellers };
        case 'combos':
            return { title: 'Super Saving Combos', books: superSavingCombos };
        case 'genres':
            return { title: 'Shop By Genre', books: genreBooks };
        case 'price':
            return { title: 'Shop By Price', books: shopByPriceBooks };
        case 'exam-prep':
            return { title: 'Exam Prep Reference Books', books: examPrepBooks };
        case 'people-also-bought':
            return { title: 'People also Bought this', books: peopleAlsoBought };
        default:
            return { title: 'All Books', books: [...newArrivals, ...hotDeals, ...genreBooks] };
    }
};

const AllBooks = () => {
    const { category, brand } = useParams<{ category?: string, brand?: string }>();
    const [booksData, setBooksData] = useState<{ title: string, books: Book[] }>({ title: 'Loading...', books: [] });
    const [isFilterMobileOpen, setIsFilterMobileOpen] = useState(false);

    // Filter States
    const [sortBy, setSortBy] = useState('relevance');
    const [selectedFormats, setSelectedFormats] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState<[number, number] | null>(null);
    const [minRating, setMinRating] = useState<number | null>(null);

    useEffect(() => {
        setBooksData(getBooksByCategory(category, brand));
        window.scrollTo(0, 0);
    }, [category, brand]);

    const filteredAndSortedBooks = useMemo(() => {
        let result = [...booksData.books];

        // Apply Filters
        if (selectedFormats.length > 0) {
            result = result.filter(book =>
                book.formats?.some(f => selectedFormats.includes(f))
            );
        }

        if (priceRange) {
            result = result.filter(book =>
                book.price >= priceRange[0] && book.price <= priceRange[1]
            );
        }

        if (minRating) {
            result = result.filter(book => book.rating >= minRating);
        }

        // Apply Sorting
        switch (sortBy) {
            case 'price-low':
                result.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                result.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                result.sort((a, b) => b.rating - a.rating);
                break;
            case 'discount':
                result.sort((a, b) => (b.discount || 0) - (a.discount || 0));
                break;
            default:
                // Keep default order
                break;
        }

        return result;
    }, [booksData.books, sortBy, selectedFormats, priceRange, minRating]);

    const toggleFormat = (format: string) => {
        setSelectedFormats(prev =>
            prev.includes(format) ? prev.filter(f => f !== format) : [...prev, format]
        );
    };

    const clearFilters = () => {
        setSelectedFormats([]);
        setPriceRange(null);
        setMinRating(null);
        setSortBy('relevance');
    };

    const FilterSection = () => (
        <div className="space-y-6">
            {/* Sort */}
            <div>
                <h3 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-3">Sort By</h3>
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-red-500"
                >
                    <option value="relevance">Relevance</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Top Rated</option>
                    <option value="discount">Biggest Discount</option>
                </select>
            </div>

            {/* Formats */}
            <div>
                <h3 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-3">Format</h3>
                <div className="space-y-2">
                    {['Paperback', 'Hardcover', 'E-Book'].map(format => (
                        <label key={format} className="flex items-center group cursor-pointer">
                            <input
                                type="checkbox"
                                checked={selectedFormats.includes(format)}
                                onChange={() => toggleFormat(format)}
                                className="w-4 h-4 rounded border-gray-300 accent-primary focus:ring-primary cursor-pointer"
                            />
                            <span className="ml-3 text-sm text-gray-600 group-hover:text-gray-900 transition-colors">{format}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Price Range */}
            <div>
                <h3 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-3">Price Range</h3>
                <div className="space-y-2">
                    {[
                        { label: 'Under ₹250', range: [0, 250] },
                        { label: '₹250 - ₹500', range: [250, 500] },
                        { label: '₹500 - ₹1000', range: [500, 1000] },
                        { label: 'Over ₹1000', range: [1000, 10000] }
                    ].map((item, idx) => (
                        <label key={idx} className="flex items-center group cursor-pointer">
                            <input
                                type="radio"
                                name="price-range"
                                checked={priceRange?.[0] === item.range[0] && priceRange?.[1] === item.range[1]}
                                onChange={() => setPriceRange(item.range as [number, number])}
                                className="w-4 h-4 border-gray-300 accent-primary focus:ring-primary cursor-pointer"
                            />
                            <span className="ml-3 text-sm text-gray-600 group-hover:text-gray-900 transition-colors">{item.label}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Rating */}
            <div>
                <h3 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-3">Rating</h3>
                <div className="space-y-2">
                    {[4, 3].map(rating => (
                        <label key={rating} className="flex items-center group cursor-pointer">
                            <input
                                type="radio"
                                name="rating"
                                checked={minRating === rating}
                                onChange={() => setMinRating(rating)}
                                className="w-4 h-4 border-gray-300 accent-primary focus:ring-primary cursor-pointer"
                            />
                            <span className="ml-3 text-sm text-gray-600 group-hover:text-gray-900 flex items-center transition-colors">
                                {rating}+ <Star className="h-3 w-3 ml-1 fill-yellow-400 text-yellow-400" />
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            <button
                onClick={clearFilters}
                className="w-full text-xs font-semibold text-red-600 hover:text-red-700 transition-colors py-2 border border-red-100 rounded-lg hover:bg-red-50"
            >
                Clear All Filters
            </button>
        </div>
    );

    return (
        <div className="bg-gray-50 min-h-screen pb-12">
            {/* Breadcrumb */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex items-center text-sm text-gray-500">
                    <Link to="/" className="hover:text-red-500 transition-colors uppercase tracking-tight font-medium">Home</Link>
                    <ChevronRight className="h-3.5 w-3.5 mx-1.5 opacity-50" />
                    <Link to="/publications" className="hover:text-red-500 transition-colors uppercase tracking-tight font-medium">Publications</Link>
                    <ChevronRight className="h-3.5 w-3.5 mx-1.5 opacity-50" />
                    <span className="text-gray-900 font-bold uppercase tracking-tight truncate">{booksData.title}</span>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-gray-200 gap-4">
                    <div>
                        <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-2 uppercase">{booksData.title}</h1>
                        <p className="text-gray-500 text-sm font-medium">Showing {filteredAndSortedBooks.length} items</p>
                    </div>

                    <button
                        onClick={() => setIsFilterMobileOpen(true)}
                        className="md:hidden flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-lg text-sm font-bold shadow-sm"
                    >
                        <Filter className="h-4 w-4" /> Filters
                    </button>
                </div>

                <div className="flex flex-col md:flex-row gap-8">
                    {/* Desktop Sidebar */}
                    <aside className="hidden md:block w-64 shrink-0">
                        <div className="sticky top-24 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                            <div className="flex items-center gap-2 mb-6 text-gray-900">
                                <SlidersHorizontal className="h-4 w-4" />
                                <span className="font-bold text-sm uppercase tracking-wider">Filters</span>
                            </div>
                            <FilterSection />
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1">
                        {filteredAndSortedBooks.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                                {filteredAndSortedBooks.map((book) => (
                                    <div key={book.id} className="h-full">
                                        <BookCard book={book} />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white rounded-2xl shadow-sm p-16 text-center border border-dashed border-gray-300">
                                <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <X className="h-8 w-8 text-gray-400" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">No results found</h3>
                                <p className="text-gray-500 mb-6">Try adjusting your filters to find what you're looking for.</p>
                                <button
                                    onClick={clearFilters}
                                    className="bg-red-600 text-white px-8 py-2.5 rounded-full font-bold hover:bg-red-700 transition-all shadow-md hover:shadow-lg"
                                >
                                    Clear all filters
                                </button>
                            </div>
                        )}
                    </main>
                </div>
            </div>

            {/* Mobile Filter Drawer */}
            {isFilterMobileOpen && (
                <div className="fixed inset-0 z-50 md:hidden">
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsFilterMobileOpen(false)} />
                    <div className="absolute inset-y-0 right-0 w-80 bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
                        <div className="flex items-center justify-between p-4 border-b">
                            <h2 className="text-lg font-bold flex items-center gap-2 uppercase tracking-tight">
                                <Filter className="h-5 w-5" /> Filters
                            </h2>
                            <button onClick={() => setIsFilterMobileOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
                                <X className="h-6 w-6" />
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-6">
                            <FilterSection />
                        </div>
                        <div className="p-4 border-t bg-gray-50">
                            <button
                                onClick={() => setIsFilterMobileOpen(false)}
                                className="w-full bg-gray-900 text-white py-3 rounded-xl font-bold text-sm uppercase tracking-widest shadow-lg"
                            >
                                Apply Filters
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AllBooks;
