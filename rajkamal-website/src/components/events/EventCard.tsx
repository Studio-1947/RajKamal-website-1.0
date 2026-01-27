import React from 'react';
import type { EventItem } from '../../data/events';
import { ArrowRight } from 'lucide-react';

interface EventCardProps {
    event: EventItem;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
    return (
        <div className="flex flex-col gap-4">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg">
                <img
                    src={event.image}
                    alt={event.title}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                />
            </div>

            <div className="space-y-3">
                <p className="text-sm text-gray-500">{event.date}</p>

                <div className="flex items-center gap-3">
                    <h3 className="text-xl font-bold text-gray-900">{event.title}</h3>
                    <span className="rounded-full bg-[#FEF3C7] px-3 py-1 text-xs font-medium text-[#D97706]">
                        {event.status}
                    </span>
                </div>

                <p className="text-sm leading-relaxed text-gray-600 line-clamp-4">
                    {event.description}
                </p>

                <div className="flex gap-3 pt-2">
                    <button className="flex items-center gap-2 rounded-full bg-[#D1E9FF] px-6 py-2 text-sm font-medium text-[#0066CC] transition-colors hover:bg-[#B3D9FF]">
                        Read More <ArrowRight className="h-4 w-4" />
                    </button>
                    <button className="rounded-full bg-[#FFD1D1] px-6 py-2 text-sm font-medium text-[#CC0000] transition-colors hover:bg-[#FFB3B3]">
                        Not Interested
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EventCard;
