import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import BookCard from '../components/BookCard';
import { newArrivals, hotDeals, genreBooks, bestSellers, superSavingCombos, shopByPriceBooks, examPrepBooks, peopleAlsoBought } from '../data/mockData';
import type { Book } from '../types';

const getBooksByCategory = (category: string | undefined): { title: string, books: Book[] } => {
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
            // Fallback to all books if no specific category matches
            return { title: 'All Books', books: [...newArrivals, ...hotDeals, ...genreBooks] };
    }
};

const AllBooks = () => {
    const { category } = useParams<{ category: string }>();
    const [booksData, setBooksData] = useState<{ title: string, books: Book[] }>({ title: 'Loading...', books: [] });

    useEffect(() => {
        setBooksData(getBooksByCategory(category));
        window.scrollTo(0, 0);
    }, [category]);

    return (
        <div className="bg-gray-50 min-h-screen pb-12">
            {/* Breadcrumb */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex items-center text-sm text-gray-500">
                    <Link to="/" className="hover:text-red-500 transition-colors">Home</Link>
                    <ChevronRight className="h-4 w-4 mx-2" />
                    <span className="text-gray-900 font-medium">Books</span>
                    <ChevronRight className="h-4 w-4 mx-2" />
                    <span className="text-gray-900 font-medium truncate">{booksData.title}</span>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">{booksData.title}</h1>
                    <span className="text-gray-500">{booksData.books.length} items</span>
                </div>

                {booksData.books.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {booksData.books.map((book) => (
                            <div key={book.id} className="h-full">
                                <BookCard book={book} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
                        <p className="text-gray-500 text-lg">No books found in this category.</p>
                        <Link to="/" className="mt-4 inline-block text-[#006BB8] hover:underline font-medium">
                            Return to Home
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllBooks;
