import React from 'react';
import { Search } from 'lucide-react';
import EventCard from '../components/events/EventCard';
import EventFilter from '../components/events/EventFilter';
import FeaturedEvent from '../components/events/FeaturedEvent';
import VideoSection from '../components/events/VideoSection';
import { upcomingEvents } from '../data/events';

const Events: React.FC = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
            {/* Upcoming Events Section */}
            <section className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Upcoming Events</h2>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {upcomingEvents.map((event) => (
                        <EventCard key={event.id} event={event} />
                    ))}
                </div>
            </section>

            {/* Search Section */}
            <section>
                <div className="relative w-full">
                    <input
                        type="text"
                        placeholder="Search Events"
                        className="w-full rounded-full bg-gray-100 px-6 py-4 text-gray-900 placeholder-gray-500 outline-none focus:ring-2 focus:ring-[#D93025]"
                    />
                    <button className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-[#D93025] p-3 text-white transition-colors hover:bg-[#B92015]">
                        <Search className="h-5 w-5" />
                    </button>
                </div>
            </section>

            {/* All Events Section */}
            <section className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">All Events</h2>
                <EventFilter />
            </section>

            {/* Featured Event Section */}
            <section className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Stree Barsh 2026</h2>
                <FeaturedEvent />
            </section>

            {/* Videos Section */}
            <section className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Videos</h2>
                <VideoSection />
            </section>
        </div>
    );
};

export default Events;
