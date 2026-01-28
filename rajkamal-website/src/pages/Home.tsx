import { useState } from 'react';
import Hero from '../components/Hero';
import CategoryCarousel from '../components/CategoryCarousel';
import BookSection from '../components/BookSection';
import { Sparkles } from 'lucide-react';
import { newArrivals, hotDeals, genreBooks } from '../data/mockData';

const Home = () => {
    const [activeArrivalFilter, setActiveArrivalFilter] = useState('December');
    const [activeDealFilter, setActiveDealFilter] = useState('25% off');
    const [activeGenreFilter, setActiveGenreFilter] = useState('Fiction');

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

            {/* Shop by genre */}
            <BookSection
                title="Shop by Genre"
                filters={['Fiction', 'Non - Fiction', 'Romance', 'Crime', 'Classic', 'Biographies', 'Health & Fitness', 'Business', 'Economics']}
                activeFilter={activeGenreFilter}
                onFilterChange={setActiveGenreFilter}
                books={genreBooks}
            />
        </>
    );
};

export default Home;
