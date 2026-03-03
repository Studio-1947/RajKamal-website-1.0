import React from 'react';
import type { EventItem } from '../../data/events';
import { ArrowRight, Calendar, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface EventCardProps {
    event: EventItem;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group"
        >
            <div className="relative aspect-[16/10] w-full overflow-hidden">
                <img
                    src={event.image}
                    alt={event.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                    <span className={`rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider shadow-sm ${event.status === 'Ongoing' ? 'bg-green-500 text-white' :
                            event.status === 'Upcoming' ? 'bg-[#F26B5E] text-white' :
                                'bg-gray-500 text-white'
                        }`}>
                        {event.status === 'Ongoing' ? 'Live Now' : event.status}
                    </span>
                </div>
            </div>

            <div className="p-6 flex flex-col flex-1 space-y-4">
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#D93025] uppercase tracking-wider">
                        <Calendar className="h-3.5 w-3.5" />
                        {event.date}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 leading-tight group-hover:text-[#D93025] transition-colors line-clamp-2">
                        {event.title}
                    </h3>
                </div>

                <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                    {event.description}
                </p>

                <div className="flex items-center gap-2 text-gray-500 text-xs">
                    <MapPin className="h-3.5 w-3.5" />
                    {event.location}
                </div>

                <div className="pt-4 mt-auto flex items-center justify-between">
                    <Link
                        to={`/event/${event.id}`}
                        className="inline-flex items-center gap-2 text-sm font-bold text-gray-900 hover:text-[#D93025] transition-colors"
                    >
                        Learn More <ArrowRight className="h-4 w-4" />
                    </Link>
                    <button className="text-gray-400 hover:text-red-500 transition-colors text-xs font-medium">
                        Dismiss
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default EventCard;
