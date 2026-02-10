import React from 'react';
import { Search } from 'lucide-react';
import EventCard from '../components/events/EventCard';
import EventFilter from '../components/events/EventFilter';
import FeaturedEvent from '../components/events/FeaturedEvent';
import VideoSection from '../components/events/VideoSection';
import { events } from '../data/events';

const Events: React.FC = () => {
    const ongoingEvents = events.filter(e => e.status === 'Ongoing');
    const upcomingEvents = events.filter(e => e.status === 'Upcoming');
    const pastEvents = events.filter(e => e.status === 'Past');

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">

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

            {/* Ongoing Events (Present) */}
            {ongoingEvents.length > 0 && (
                <section className="space-y-6">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-8 bg-green-500 rounded-full"></span>
                        <h2 className="text-2xl font-bold text-gray-900">Happening Now</h2>
                    </div>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {ongoingEvents.map((event) => (
                            <EventCard key={event.id} event={event} />
                        ))}
                    </div>
                </section>
            )}

            {/* Upcoming Events */}
            {upcomingEvents.length > 0 && (
                <section className="space-y-6">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-8 bg-blue-500 rounded-full"></span>
                        <h2 className="text-2xl font-bold text-gray-900">Upcoming Events</h2>
                    </div>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {upcomingEvents.map((event) => (
                            <EventCard key={event.id} event={event} />
                        ))}
                    </div>
                </section>
            )}

            {/* Past Events */}
            {pastEvents.length > 0 && (
                <section className="space-y-6">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-8 bg-gray-400 rounded-full"></span>
                        <h2 className="text-2xl font-bold text-gray-900">Past Events</h2>
                    </div>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {pastEvents.map((event) => (
                            <EventCard key={event.id} event={event} />
                        ))}
                    </div>
                </section>
            )}

            {/* Featured Event Section */}
            <section className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Stree Barsh 2026</h2>
                <FeaturedEvent />
            </section>

            {/* All Events Section with Filter (Optional, maybe redundant now but keeping layout) */}
            <section className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Explore Categories</h2>
                <EventFilter />
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
