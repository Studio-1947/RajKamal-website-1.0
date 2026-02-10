import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, Share2 } from 'lucide-react';
import { events } from '../data/events';

const EventDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const event = events.find(e => e.id === id);

    if (!event) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-16 text-center">
                <h2 className="text-2xl font-bold text-gray-900">Event not found</h2>
                <Link to="/events" className="text-red-500 hover:text-red-600 mt-4 inline-block">
                    Back to Events
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen pb-12">
            {/* Hero Image */}
            <div className="h-[400px] w-full relative">
                <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full p-8 max-w-7xl mx-auto">
                    <Link to="/events" className="text-white/80 hover:text-white flex items-center gap-2 mb-4 w-fit">
                        <ArrowLeft className="h-5 w-5" /> Back to Events
                    </Link>
                    <div className="flex items-center gap-3 mb-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${event.status === 'Ongoing' ? 'bg-green-500 text-white' :
                                event.status === 'Upcoming' ? 'bg-blue-500 text-white' :
                                    'bg-gray-500 text-white'
                            }`}>
                            {event.status}
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{event.title}</h1>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
                <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        <h2 className="text-2xl font-bold text-gray-900">About the Event</h2>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            {event.description}
                        </p>

                        {/* Placeholder for future gallery or more details */}
                        <div className="bg-gray-50 rounded-lg p-6 border border-gray-100">
                            <h3 className="font-semibold text-gray-900 mb-2">Event Highlights</h3>
                            <ul className="list-disc list-inside text-gray-600 space-y-1">
                                <li>Meet renowned authors</li>
                                <li>Book launches and signings</li>
                                <li>Cultural performances</li>
                                <li>Workshops for children</li>
                            </ul>
                        </div>
                    </div>

                    {/* Sidebar Info */}
                    <div className="space-y-6">
                        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                            <h3 className="font-semibold text-gray-900 mb-4 text-lg">Event Details</h3>

                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <Calendar className="h-5 w-5 text-red-500 mt-0.5" />
                                    <div>
                                        <p className="font-medium text-gray-900">Date</p>
                                        <p className="text-gray-600">{event.date}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <MapPin className="h-5 w-5 text-red-500 mt-0.5" />
                                    <div>
                                        <p className="font-medium text-gray-900">Location</p>
                                        <p className="text-gray-600">{event.location}</p>
                                    </div>
                                </div>
                            </div>

                            <button className="w-full mt-6 bg-[#D93025] text-white py-3 rounded-lg font-medium hover:bg-[#B92015] transition-colors flex items-center justify-center gap-2">
                                <Share2 className="h-4 w-4" /> Share Event
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventDetails;
