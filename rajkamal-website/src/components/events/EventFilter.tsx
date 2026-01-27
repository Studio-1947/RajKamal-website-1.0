import React from 'react';
import { eventFilters } from '../../data/events';

const EventFilter: React.FC = () => {
    return (
        <div className="flex flex-wrap gap-3">
            {eventFilters.map((filter, index) => (
                <button
                    key={index}
                    className="rounded-full bg-[#D1E9FF] px-6 py-2 text-sm font-medium text-[#0066CC] transition-colors hover:bg-[#B3D9FF]"
                >
                    {filter}
                </button>
            ))}
        </div>
    );
};

export default EventFilter;
