import { useState } from 'react';
import Hero from '../components/Hero';
import CategoryCarousel from '../components/CategoryCarousel';
import BookSection from '../components/BookSection';
import { Sparkles, Trophy, GraduationCap, ShoppingBag, Tag, BookOpen, Users } from 'lucide-react';
import { newArrivals, hotDeals, genreBooks, bestSellers, superSavingCombos, shopByPriceBooks, examPrepBooks, peopleAlsoBought } from '../data/mockData';
import type { Book } from '../types';

const getFilteredBooks = (books: Book[], filter: string, type: 'category' | 'price' | 'deal' = 'category') => {
    if (!filter || !books || books.length === 0) return books;

    if (type === 'price') {
        return books.map((book) => {
            let targetPrice = book.price;
            const offset = (book.id * 17) % 50;
            if (filter === 'Under 299') targetPrice = 199 + offset;
            else if (filter === '300 - 499') targetPrice = 399 + offset;
            else if (filter === '499 - 799') targetPrice = 599 + offset;
            else if (filter === 'Above 800') targetPrice = 899 + offset;
            return { ...book, price: targetPrice, originalPrice: targetPrice + 100 };
        });
    }

    if (type === 'deal') {
        return books.map(book => {
            const discountMatch = filter.match(/\d+/);
            const discount = discountMatch ? parseInt(discountMatch[0]) : 25;
            return { ...book, discount };
        });
    }

    // Default category shuffle
    let seed = 0;
    for (let i = 0; i < filter.length; i++) {
        seed += filter.charCodeAt(i);
    }
    const rotation = seed % books.length;
    return [...books.slice(rotation), ...books.slice(0, rotation)];
};

const Home = () => {
    const [activeArrivalFilter, setActiveArrivalFilter] = useState('December');
    const [activeDealFilter, setActiveDealFilter] = useState('25% off');
    const [activeGenreFilter, setActiveGenreFilter] = useState('Fiction');
    const [activePriceFilter, setActivePriceFilter] = useState('Under 299');
    const [activeExamFilter, setActiveExamFilter] = useState('UGC');

    return (
        <>
            <Hero />
            <CategoryCarousel />

            {/* New Arrivals */}
            <BookSection
                title="New Arrivals"
                filters={['December', 'November', 'October', 'September', 'August']}
                activeFilter={activeArrivalFilter}
                onFilterChange={setActiveArrivalFilter}
                books={getFilteredBooks(newArrivals, activeArrivalFilter, 'category')}
                bgClassName="bg-gradient-to-r from-red-100 via-red-100 to-red-100"
                viewAllLink="/books/new-arrivals"
            />

            {/* Hot Deals */}
            <BookSection
                title="Hot Deals"
                titleIcon={<Sparkles className="h-6 w-6 text-red-500 fill-red-500" />}
                filters={['25% off', '30% off', '35% off']}
                activeFilter={activeDealFilter}
                onFilterChange={setActiveDealFilter}
                books={getFilteredBooks(hotDeals, activeDealFilter, 'deal')}
                viewAllLink="/books/hot-deals"
            />

            {/* Best Sellers */}
            <BookSection
                title="Best Sellers"
                titleIcon={<Trophy className="h-6 w-6 text-red-500" />}
                books={bestSellers}
                bgClassName="bg-gradient-to-r from-red-100 via-red-100 to-red-100"
                viewAllLink="/books/best-sellers"
            />

            {/* Super Saving Combos */}
            <BookSection
                title="Super Saving Combos"
                titleIcon={<Tag className="h-6 w-6 text-red-500 fill-red-500/20" />}
                books={superSavingCombos}
                viewAllLink="/books/combos"
            />

            {/* Shop by Genre */}
            <BookSection
                title="Shop By Genre"
                titleIcon={<BookOpen className="h-6 w-6 text-red-500" />}
                filters={['Fiction', 'Non Fiction', 'Romance', 'Crime Fiction', 'Classic Fiction', 'Biographies & Memories', 'Health & Fitness', 'Business', 'Economics', 'Self Help']}
                activeFilter={activeGenreFilter}
                onFilterChange={setActiveGenreFilter}
                books={getFilteredBooks(genreBooks, activeGenreFilter, 'category')}
                bgClassName="bg-gradient-to-r from-red-100 via-red-100 to-red-100"
                viewAllLink="/books/genres"
            />

            {/* Shop By Price */}
            <BookSection
                title="Shop By Price"
                titleIcon={<ShoppingBag className="h-6 w-6 text-red-500" />}
                filters={['Under 299', '300 - 499', '499 - 799', 'Above 800']}
                activeFilter={activePriceFilter}
                onFilterChange={setActivePriceFilter}
                books={getFilteredBooks(shopByPriceBooks, activePriceFilter, 'price')}
                viewAllLink="/books/price"
            />

            {/* Exam Prep Reference Book */}
            <BookSection
                title="Exam Prep Reference Book"
                titleIcon={<GraduationCap className="h-6 w-6 text-red-500" />}
                filters={['UGC', 'UPSC', 'SSC', 'CTET', 'Banking']}
                activeFilter={activeExamFilter}
                onFilterChange={setActiveExamFilter}
                books={getFilteredBooks(examPrepBooks, activeExamFilter, 'category')}
                bgClassName="bg-gradient-to-r from-red-100 via-red-100 to-red-100"
                viewAllLink="/books/exam-prep"
            />

            {/* People also Bought this */}
            <BookSection
                title="People also Bought this"
                titleIcon={<Users className="h-6 w-6 text-red-500" />}
                books={peopleAlsoBought}
                viewAllLink="/books/people-also-bought"
            />
        </>
    );
};

export default Home;
