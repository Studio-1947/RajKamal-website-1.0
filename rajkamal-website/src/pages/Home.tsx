import { useState } from 'react';
import Hero from '../components/Hero';
import CategoryCarousel from '../components/CategoryCarousel';
import BookSection from '../components/BookSection';
import { Sparkles, Trophy, GraduationCap, ShoppingBag, Tag, BookOpen, Users } from 'lucide-react';
import { newArrivals, hotDeals, genreBooks, bestSellers, superSavingCombos, shopByPriceBooks, examPrepBooks, peopleAlsoBought } from '../data/mockData';

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
                books={newArrivals}
            />

            {/* Hot Deals */}
            <BookSection
                title="Hot Deals"
                titleIcon={<Sparkles className="h-6 w-6 text-red-500 fill-red-500" />}
                filters={['25% off', '30% off', '35% off']}
                activeFilter={activeDealFilter}
                onFilterChange={setActiveDealFilter}
                books={hotDeals}
            />

            {/* Best Sellers */}
            <BookSection
                title="Best Sellers"
                titleIcon={<Trophy className="h-6 w-6 text-yellow-500" />}
                books={bestSellers}
            />

            {/* Super Saving Combos */}
            <BookSection
                title="Super Saving Combos"
                titleIcon={<Tag className="h-6 w-6 text-green-500" />}
                books={superSavingCombos}
            />

            {/* Shop by Genre */}
            <BookSection
                title="Shop By Genre"
                titleIcon={<BookOpen className="h-6 w-6 text-purple-500" />}
                filters={['Fiction', 'Non Fiction', 'Romance', 'Crime Fiction', 'Classic Fiction', 'Biographies & Memories', 'Health & Fitness', 'Business', 'Economics', 'Self Help']}
                activeFilter={activeGenreFilter}
                onFilterChange={setActiveGenreFilter}
                books={genreBooks}
            />

            {/* Shop By Price */}
            <BookSection
                title="Shop By Price"
                titleIcon={<ShoppingBag className="h-6 w-6 text-orange-500" />}
                filters={['Under 299', '300 - 499', '499 - 799', 'Above 800']}
                activeFilter={activePriceFilter}
                onFilterChange={setActivePriceFilter}
                books={shopByPriceBooks}
            />

            {/* Exam Prep Reference Book */}
            <BookSection
                title="Exam Prep Reference Book"
                titleIcon={<GraduationCap className="h-6 w-6 text-blue-500" />}
                filters={['UGC']}
                activeFilter={activeExamFilter}
                onFilterChange={setActiveExamFilter}
                books={examPrepBooks}
            />

            {/* People also Bought this */}
            <BookSection
                title="People also Bought this"
                titleIcon={<Users className="h-6 w-6 text-pink-500" />}
                books={peopleAlsoBought}
            />
        </>
    );
};

export default Home;
